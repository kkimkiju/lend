package com.example.demo.controller;

import com.example.demo.dto.ChatRoomReqDto;
import com.example.demo.dto.ChatRoomResDto;
import com.example.demo.entity.ChatRoom;
import com.example.demo.service.ChatService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;


@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/chat")
public class ChatController {
    private final ChatService chatService;
    @PostMapping("/new")
    public ResponseEntity<ChatRoomResDto> createRoom(@RequestBody ChatRoomReqDto chatRoomReqDto) {
        log.warn("email : {}", chatRoomReqDto);
//        ChatRoomResDto room = chatService.createRoom(chatRoomReqDto.getEmail());
//        System.out.println(room.getRoomId());
        return ResponseEntity.ok(chatService.createRoom(chatRoomReqDto.getEmail()));
    }
    @GetMapping("/list")
    public List<ChatRoomResDto> findAllRoom() {
        return chatService.findAllRoom();
    }

    // 방 정보 가져오기
    @GetMapping("/room/{roomId}")
    public ChatRoomResDto findRoomById(@PathVariable String roomId) {
        return chatService.findRoomById(roomId);
    }
}