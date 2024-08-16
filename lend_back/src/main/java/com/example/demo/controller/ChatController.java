package com.example.demo.controller;

import com.example.demo.dto.ChatMessageDto;
import com.example.demo.dto.ChatRoomDto;
import com.example.demo.dto.ChatRoomReqDto;
import com.example.demo.entity.ChatMessage;
import com.example.demo.service.ChatService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.stream.Collectors;


@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/chat")
public class ChatController {
    private final ChatService chatService;

    // 채팅방 유무 확인
    @GetMapping("/check")
    public ResponseEntity<String> isRoom(@RequestParam String roomName) {
        boolean isTrue = chatService.isRoom(roomName);
        String roomId = "null";
        if (isTrue == true) {
            roomId = chatService.roomInfo(roomName);
            log.warn("roomId : {}", roomId);
        } else {log.warn("roomId : {}", roomId);}
        return ResponseEntity.ok(roomId);
    }



    @PostMapping("/new")
    public ResponseEntity<ChatRoomDto> createRoom(@RequestBody ChatRoomReqDto chatRoomReqDto) {
        log.warn("email : {}", chatRoomReqDto.getEmail());
        return ResponseEntity.ok(chatService.createRoom(chatRoomReqDto.getEmail()));
    }
    @GetMapping("/list")
    public ResponseEntity<List<ChatRoomDto>> findAllRoom() {
        List<ChatRoomDto> list = chatService.findAllRoom();
        return ResponseEntity.ok(list);
    }

    // 방 정보 가져오기
    @GetMapping("/room/{roomId}")
    public ChatRoomDto findRoomById(@PathVariable String roomId) {
        return chatService.findRoomById(roomId);
    }

    // 메세지 가져오기
    @GetMapping("/messages/{roomId}")
    public ResponseEntity<List<ChatMessageDto>> getMessages(@PathVariable String roomId) {
        List<ChatMessage> messages = chatService.getMessages(roomId);
        List<ChatMessageDto> messageDtos = messages.stream().map(msg -> {
            ChatMessageDto dto = new ChatMessageDto();
            dto.setSender(msg.getSender().getEmail());
            dto.setMessage(msg.getMessage());
            dto.setRoomId(msg.getChatId().toString());
            return dto;
        }).collect(Collectors.toList());
        return ResponseEntity.ok(messageDtos);
    }
}