package com.example.demo.controller;

import com.example.demo.dto.CommentDto;
import com.example.demo.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/support")
public class CommentController {
    private final CommentService commentService;

    // 댓글 생성
    @PostMapping("create-comment")
    public ResponseEntity<CommentDto> createComment(@RequestBody CommentDto commentDto) {
        CommentDto createdComment = commentService.createComment(commentDto);
        return ResponseEntity.ok(createdComment);
    }
    // 댓글 수정
    @PutMapping("/modify-comment")
    public ResponseEntity<Boolean> modifyComment(@RequestBody CommentDto commentDto){
        boolean isTure = commentService.modifyComment(commentDto);
        return ResponseEntity.ok(isTure);
    }
    // 댓글 삭제 실제로는 삭제되지 않고 DeletedStatus만 true로 변경
    @PutMapping("delete-comment")
    public ResponseEntity<Boolean> deleteComment(@RequestBody CommentDto commentDto){
        boolean isTure = commentService.modifyComment(commentDto);
        return ResponseEntity.ok(isTure);
    }

    // 댓글 DB에서 리얼루다가 삭제
    @DeleteMapping("delete-physical-comment/{id}")
    public ResponseEntity<Boolean> deletePhysicalComment(@PathVariable("id") Long id) {
        boolean isTure = commentService.deletePhysicalComment(id);
        return ResponseEntity.ok(isTure);
    }
    // questionId로 댓글 조회
    @GetMapping("/question/{questionId}") ///주소 대소문자 꼭확인 ! @PathVariable 랑 대소문자 안맞추면 적용 안됨
    public ResponseEntity<List<CommentDto>> getCommentsByQuestionId(@PathVariable("questionId") Long questionId) {
        List<CommentDto> comments = commentService.getCommentsByQuestionId(questionId);
        return ResponseEntity.ok(comments);
    }
    // questionId로 댓글 트리구조로 호출
    @GetMapping("/comment-list/{questionId}")
    public ResponseEntity<List<CommentDto>> getCommentsByQuestionIdForTree(@PathVariable("questionId") Long questionId) {
        List<CommentDto> commentDtoList = commentService.getCommentsByQuestionIdForTree(questionId);
        return ResponseEntity.ok(commentDtoList);
    }

    @GetMapping("/comment/{commentId}")
    public ResponseEntity<CommentDto> getCommentById(@PathVariable("commentId") Long commentId) {
        CommentDto comment = commentService.getCommentById(commentId);
        return ResponseEntity.ok(comment);
    }
}
