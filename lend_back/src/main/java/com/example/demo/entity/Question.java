package com.example.demo.entity;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Getter
@Setter
@Entity
public class Question {
    @Id
    @GeneratedValue
    @Column(name = "question_id")
    private Long id;
    private String title;
    private String content;
    private String createTime;
    private String modifyTime;
    private Boolean isPrivate; // 비공개 질문여부
    @OneToMany(mappedBy = "question", cascade = CascadeType.REMOVE, orphanRemoval = true)
    private List<Comment> commentList;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    // 시간 미입력시 자동 생성
    @PrePersist
    protected void onCreate() {
        LocalDateTime now = LocalDateTime.now();
        this.createTime = now.format(DateTimeFormatter.ofPattern("yyyy.MM.dd HH:mm:ss"));
        this.modifyTime = now.format(DateTimeFormatter.ofPattern("yyyy.MM.dd HH:mm:ss"));
    }

    @PreUpdate
    protected void onUpdate() {
        this.modifyTime = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy.MM.dd HH:mm:ss"));
    }
}
