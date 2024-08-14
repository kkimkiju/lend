package com.example.demo.dto;

import com.example.demo.entity.Comment;
import com.example.demo.entity.Member;
import com.example.demo.entity.Question;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@Setter
public class QuestionDto {
    private Long id;
    private String title;
    private String content;
    private String createTime;
    private String modifyTime;
    private Boolean isPrivate;
    private List<CommentDto> commentList;
    private MemberResDto memberResDto;
}