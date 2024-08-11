package com.example.demo.service;

import com.example.demo.dto.CommentDto;
import com.example.demo.entity.Comment;
import com.example.demo.entity.Member;
import com.example.demo.entity.Question;
import com.example.demo.repository.CommentRepository;
import com.example.demo.repository.MemberRepository;
import com.example.demo.repository.QuestionRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@RequiredArgsConstructor
@Service
public class CommentService {
    private final CommentRepository commentRepository;
    private final QuestionRepository questionRepository;
    private final MemberRepository memberRepository;
    @Transactional
    public CommentDto createComment(CommentDto commentDto) { // questionId, email, parentId를 확인
        Question question = questionRepository.findById(commentDto.getQuestionId())
                .orElseThrow(() -> new EntityNotFoundException("Question not found"));
        log.info("Searching for user with commenterId: {}", commentDto.getMemberReqDto().getEmail());

        Member commenter = memberRepository.findByEmail(commentDto.getMemberReqDto().getEmail())
                .orElseThrow(() -> new EntityNotFoundException("User with ID " + commentDto.getMemberReqDto().getEmail() + " not found"));

        Comment parent = commentDto.getParentId() != null ? commentRepository.findById(commentDto.getParentId())
                .orElseThrow(() -> new EntityNotFoundException("Parent comment not found")) : null;

        Comment comment = new Comment();
        comment.setContent(commentDto.getContent());
        comment.setDeletedStatus(false);
        comment.setQuestion(question);
        comment.setMember(commenter);
        comment.setParent(parent);

        Comment savedComment = commentRepository.save(comment);

        return CommentDto.convertEntityToDto(savedComment);
    }
    // 댓글 수정
    public boolean modifyComment(Long id, CommentDto commentDto) {
        try{
            Comment comment = commentRepository.findById(id).orElseThrow(
                    () -> new RuntimeException("해당 댓글이 존재하지 않습니다.")
            );
            comment.setContent(commentDto.getContent());
            comment.setModifyTime(String.valueOf(LocalDateTime.now()));
            commentRepository.save(comment);
            return true;
        } catch (Exception e) {
            log.error(e.getMessage(), e);
            return false;
        }
    }
    // 댓글 삭제
    public boolean deleteComment(Long id, CommentDto commentDto) {
        try{
            Comment comment = commentRepository.findById(id).orElseThrow(
                    () -> new RuntimeException("해당 댓글이 존재하지 않습니다.")
            );
            comment.setDeletedStatus(true);
            comment.setModifyTime(String.valueOf(LocalDateTime.now()));
            commentRepository.save(comment);
            return true;
        } catch (Exception e) {
            log.error(e.getMessage(), e);
            return false;
        }
    }


    // 댓글 실제 삭제
    public boolean deletePhysicalComment(Long id) {
        try {
            Comment comment = commentRepository.findById(id).orElseThrow(
                    () -> new RuntimeException("해당 댓글이 존재하지 않습니다.")
            );
            commentRepository.delete(comment);
            return true;
        } catch (Exception e) {
            log.error(e.getMessage(), e);
            return false;
        }
    }

    @Transactional(readOnly = true)
    public List<CommentDto> getCommentsByQuestionId(Long questionId) {
        return commentRepository.findByQuestionId(questionId)
                .stream().map(CommentDto::convertEntityToDto)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public CommentDto getCommentById(Long commentId) {
        return commentRepository.findById(commentId)
                .map(CommentDto::convertEntityToDto)
                .orElseThrow(() -> new EntityNotFoundException("Comment not found"));
    }
}
