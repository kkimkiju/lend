package com.example.demo.repository;

import com.example.demo.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByQuestionId(Long questionId); // 특정 질문에 대한 댓글 목록 조회
    List<Comment> findByParentId(Long parentId); // 특정 부모 댓글의 대댓글 조회
}
