package com.example.demo.entity;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

import static javax.persistence.FetchType.LAZY;

@Getter
@Setter
@Entity
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "comment_id")
    private Long id;
    @Column(nullable = false, length = 1000)
    private String content;
    @ColumnDefault("FALSE")
    @Column(nullable = false)
    private Boolean deletedStatus;
    private String createTime;
    private String modifyTime;
    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "member_id")
    private Member member;
    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "parent_id")
    private Comment parent; // 부모 댓글
    @OneToMany(mappedBy = "parent")
    private List<Comment> children = new ArrayList<>(); // 자식댓글들(대댓글)
    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "question_id")
    private Question question;

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