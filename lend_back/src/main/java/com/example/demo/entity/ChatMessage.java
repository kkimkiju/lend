package com.example.demo.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Getter
@Setter
@ToString(exclude = "chatRoom")
@Entity
@Table(name = "chat_message")
public class ChatMessage {
    @Id
    @Column(name = "chat_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long chatId;

    @ManyToOne
    @JoinColumn(name = "room_id")
    @JsonBackReference
    private ChatRoom roomId;

    @ManyToOne
    @JoinColumn(name = "sender_id")
    private Member sender;

    @Column
    private String message;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private String localDateTime;

    @Column(nullable = false)
    private boolean isRead; // 읽음 상태를 나타내는 필드 추가

    @PrePersist // 날짜가 비어있는 경우 현재 시간 자동 입력
    protected void onCreate() {
        if (this.localDateTime == null) {
            this.localDateTime = LocalDateTime.now().format(DateTimeFormatter.ISO_DATE_TIME);
        }
    }
}
