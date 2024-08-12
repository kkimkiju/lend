package com.example.demo.controller;

import com.example.demo.dto.ChatRoomDto;
import com.example.demo.dto.ChatRoomReqDto;
import com.example.demo.entity.ChatRoom;
import com.example.demo.service.ChatService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;


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
//        ChatRoomResDto room = chatService.createRoom(chatRoomReqDto.getEmail());
//        System.out.println(room.getRoomId());
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

    // 방 삭제
//    @GetMapping("/delete")
//    public ResponseEntity<Boolean> deleteRoom(@PathVariable String roomId) {
//        boolean isTrue = chatService.removeRoom(roomId);
//        return ResponseEntity.ok(isTrue);
//    }
}