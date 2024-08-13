package com.example.demo.repository;

import com.example.demo.entity.ChatMessage;
import com.example.demo.entity.ChatRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface ChatMessageRepository extends JpaRepository <ChatMessage, Long> {
    List<ChatMessage> findByRoomId(ChatRoom room);
    @Modifying
    @Query("DELETE FROM ChatMessage c WHERE c.roomId = :roomId")
    void deleteByRoomId(@Param("roomId") String roomId);
}
