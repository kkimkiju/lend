package com.example.demo.dto;


import com.example.demo.entity.ChatRoom;
import lombok.Builder;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.socket.WebSocketSession;
import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.Collections;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

@Getter
@Slf4j
public class ChatRoomDto {
    private String roomId; // 채팅방 ID
    private String roomName; // 채팅방 이름
    private String regDate; // 채팅방 생성 시간

    @JsonIgnore // 이 어노테이션으로 WebSocketSession의 직렬화를 방지
    private Set<WebSocketSession> sessions; // 채팅방에 입장한 세션 정보를 담을 Set
    // 세션 수가 0인지 확인하는 메서드
    public boolean isSessionEmpty() {
        return this.sessions.isEmpty();
    }

    @Builder // 빌더 패턴 적용
    public ChatRoomDto(String roomId, String roomName, String regDate) {
        this.roomId = roomId;
        this.roomName = roomName;
        this.regDate = regDate;
        this.sessions = Collections.newSetFromMap(new ConcurrentHashMap<>()); // 동시성 문제를 해결하기 위해 ConcurrentHashMap 사용
    }
//    public static ChatRoomDto of(ChatRoom chatRoom){
//        return ChatRoomDto.builder()
//        .roomId(chatRoom.getRoomId())
//        .roomName(chatRoom.getRoomName())
//        .regDate(chatRoom.getRegDate())
//                .build();}
}
