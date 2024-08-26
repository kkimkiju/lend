package com.example.demo.service;

import com.example.demo.dto.ChatMessageDto;
import com.example.demo.dto.ChatRoomDto;
import com.example.demo.entity.ChatMessage;
import com.example.demo.entity.ChatRoom;
import com.example.demo.entity.Member;
import com.example.demo.repository.ChatMessageRepository;
import com.example.demo.repository.ChatRoomRepository;
import com.example.demo.repository.MemberRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import javax.annotation.PostConstruct;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Slf4j
@RequiredArgsConstructor
@Service
public class ChatService {
    private final ObjectMapper objectMapper; // JSON 문자열로 변환하기 위한 객체
    private Map<String, ChatRoomDto> chatRooms; // 채팅방 정보를 담을 맵
    private final ChatRoomRepository chatRoomRepository;
    private final ChatMessageRepository chatMessageRepository;
    private final MemberRepository memberRepository;
    @PostConstruct // 의존성 주입 이후 초기화를 수행하는 메소드
    private void init() { // 채팅방 정보를 담을 맵을 초기화
        chatRooms = new LinkedHashMap<>(); // 채팅방 정보를 담을 맵
    }

    // 방 있는지 확인(방 개설 가능 여부 확인)
    public boolean isRoom(String roomName) {return chatRoomRepository.existsByRoomName(roomName);}

    // 방 정보 가져오기
    public String roomInfo(String roomName) {
        Optional<ChatRoom> chatRoom = chatRoomRepository.findByRoomName(roomName);
        return chatRoom.get().getRoomId();
    }

    public List<ChatRoomDto> findAllRoom() { // 채팅방 리스트 반환
        List<ChatRoom> chatrooms = chatRoomRepository.findAll();
        List<ChatRoomDto> chatRoomDtos = new ArrayList<>();
        for(ChatRoom chatRoom : chatrooms) {
            ChatRoomDto dto = new ChatRoomDto(
                    chatRoom.getRoomId(),
                    chatRoom.getRoomName(),
                    chatRoom.getRegDate()
            );
            chatRoomDtos.add(dto);
        }
        return chatRoomDtos;
    }
    public ChatRoomDto findRoomById(String roomId) {
        return chatRooms.get(roomId);
    }

    // 방 개설하기
    public ChatRoomDto createRoom(String email) {
        String randomId = UUID.randomUUID().toString();
        log.info("UUID : " + randomId);
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss");
        String regDateStr = LocalDateTime.now().format(formatter);

        ChatRoomDto chatRoom = ChatRoomDto.builder()
                .roomId(randomId)
                .roomName(email)
                .regDate(regDateStr)
                .build();
        chatRooms.put(randomId, chatRoom);

        ChatRoom chatroom = new ChatRoom();
        chatroom.setRoomId(chatRoom.getRoomId());
        chatroom.setRoomName(chatRoom.getRoomName());
        chatroom.setRegDate(chatRoom.getRegDate());

        chatRoomRepository.save(chatroom);

        return chatRoom;
    }

    @Transactional
    public void removeRoom(String roomId) {
        try {
            chatRoomRepository.deleteByRoomId(roomId);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }


    @Transactional
    public void removeMessage(String roomId) {
        ChatRoomDto room = chatRooms.get(roomId);
        ChatRoom room1 = chatRoomRepository.findById(roomId).orElse(null);
        List<ChatMessage> msgList = chatMessageRepository.findByRoomId(room1);
        if (room != null) {
            if (room.isSessionEmpty()) {
                try {
                    chatRooms.remove(roomId);
                    for (ChatMessage msg : msgList) {
                        chatMessageRepository.delete(msg);
                    }
                } catch (Exception e) {
                    throw new RuntimeException(e);
                }
                List<ChatMessage> msgExistCheck = chatMessageRepository.findByRoomId(room1);
                if (msgExistCheck.isEmpty()) {
                    removeRoom(roomId);
                }
            }
        }
    }

    // 메세지 가져오기
    public List<ChatMessage> getMessages(String roomId) {
        ChatRoom chatRoom = chatRoomRepository.findByRoomId(roomId);
        return chatMessageRepository.findByRoomId(chatRoom);
    }

    // 채팅방에 입장한 세션 추가
    public void addSessionAndHandleEnter(String roomId, WebSocketSession session, ChatMessageDto chatMessage) {
        ChatRoomDto room = findRoomById(roomId);
        if (room != null) {
            room.getSessions().add(session); // 채팅방에 입장한 세션 추가
            log.debug("New session added: " + session);
        }
    }
    // 채팅방에서 퇴장한 세션 제거
    @Transactional
    public void removeSessionAndHandleExit(String roomId, WebSocketSession session, ChatMessageDto chatMessage) {
        ChatRoomDto room = findRoomById(roomId);
        if (room != null) {
            room.getSessions().remove(session); // 채팅방에서 퇴장한 세션 제거
            if (chatMessage.getSender() != null) { // 채팅방에서 퇴장한 사용자가 있으면
                chatMessage.setMessage(chatMessage.getSender() + "님이 퇴장했습니다.");
                sendMessageToAll(roomId, chatMessage); // 채팅방에 퇴장 메시지 전송
            }
            log.debug("Session removed: " + session);
            if (room.isSessionEmpty()) {
                removeMessage(roomId);
            }
        }
    }

    public void sendMessageToAll(String roomId, ChatMessageDto messageDto) {
        ChatRoomDto roomDto = findRoomById(roomId);
        ChatRoom room = chatRoomRepository.findById(roomId).orElse(null);
        Optional<Member> sender = memberRepository.findByEmail(messageDto.getSender());

        if (roomDto != null) {
            for (WebSocketSession session : roomDto.getSessions()) {
                sendMessage(session, messageDto);
            }
        }

        // ChatMessage 엔티티 생성 및 저장
        ChatMessage msg = new ChatMessage();
        msg.setRoomId(room);
        msg.setSender(sender.get());
        msg.setMessage(messageDto.getMessage());

        // LocalDateTime 필드는 @PrePersist에 의해 자동으로 설정됩니다.
        chatMessageRepository.save(msg);
    }

    @Transactional
    public void markMessagesAsRead(String roomId) {
        ChatRoom chatRoom = chatRoomRepository.findByRoomId(roomId);
        chatMessageRepository.markMessagesAsReadByRoomId(chatRoom);
    }

    public <T> void sendMessage(WebSocketSession session, T message) {
        try {
            session.sendMessage(new TextMessage(objectMapper.writeValueAsString(message)));
        } catch(IOException e) {
            log.error(e.getMessage(), e);
        }
    }
}