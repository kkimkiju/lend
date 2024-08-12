package com.example.demo.repository;

import com.example.demo.entity.ChatMessage;
import com.example.demo.entity.ChatRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface ChatRoomRepository extends JpaRepository <ChatRoom, String>{
    @Query("SELECT r.roomId FROM ChatRoom r WHERE r.roomId = :roomId")
    List<String> findByRoomId(String roomId);
    boolean existsByRoomName(String roomName);
    Optional<ChatRoom> findByRoomName(String roomName);

    @Modifying
    @Query("DELETE FROM ChatRoom c WHERE c.roomId = :roomId")
    void deleteByRoomId(@Param("roomId") String roomId);
}

