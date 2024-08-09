package com.example.demo.dto;

import com.example.demo.entity.Comment;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@Setter
public class CommentDto {
    private Long id;
    private String content;
    private Boolean deletedStatus;
    private Long parentId;
    private Long questionId;
    private String email;
    private List<CommentDto> children;

    // 엔티티를 DTO로 변환하는 메서드
    public static CommentDto fromEntity(Comment comment) {
        CommentDto dto = new CommentDto();
        dto.setId(comment.getId());
        dto.setContent(comment.getContent());
        dto.setDeletedStatus(comment.getDeletedStatus());
        dto.setParentId(comment.getParent() != null ? comment.getParent().getId() : null);
        dto.setQuestionId(comment.getQuestion().getId());
        dto.setEmail(comment.getMember().getEmail());
        dto.setChildren(comment.getChildren().stream().map(CommentDto::fromEntity).collect(Collectors.toList()));
        return dto;
    }
}
