package com.example.demo.dto;

import com.example.demo.entity.Comment;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class QuestionDto {
    private Long id;
    private String title;
    private String content;
    private List<Comment> commentList;
    private MemberReqDto MemberReqDto;
}