package com.example.demo.dto;

import com.example.demo.entity.Comment;
import com.example.demo.entity.Member;
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
    private MemberReqDto memberReqDto;
    private List<CommentDto> children;

    // 엔티티를 DTO로 변환하는 메서드
    public static CommentDto convertEntityToDto(Comment comment) {
        CommentDto dto = new CommentDto();
        dto.setId(comment.getId());
        dto.setContent(comment.getContent());
        dto.setDeletedStatus(comment.getDeletedStatus());
        dto.setParentId(comment.getParent() != null ? comment.getParent().getId() : null);
        dto.setQuestionId(comment.getQuestion().getId());
        dto.setMemberReqDto(convertUserToDto(comment.getMember()));
        dto.setChildren(comment.getChildren().stream().map(CommentDto::convertEntityToDto).collect(Collectors.toList()));
        return dto;
    }
    private static MemberReqDto convertUserToDto(Member member) {
        MemberReqDto dto = new MemberReqDto();
        dto.setEmail(member.getEmail());
        dto.setName(member.getName());
        // 추가 필드들 설정
        return dto;
    }
}
