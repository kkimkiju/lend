package com.example.demo.controller;

import com.example.demo.constant.Authority;
import com.example.demo.dto.MemberResDto;
import com.example.demo.dto.QuestionDto;
import com.example.demo.service.AuthService;
import com.example.demo.service.QuestionService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RequiredArgsConstructor
@RestController
@RequestMapping("/support")
public class QuestionController {
    private final QuestionService questionService;
    private final AuthService authService;

    // 게시글 등록
    @PostMapping("/create-question")
    public ResponseEntity<Boolean> createQuestion(@RequestBody QuestionDto questionDto) {
        boolean isTrue = questionService.createQuestion(questionDto);
        return ResponseEntity.ok(isTrue);
    }
    // 게시글 수정
    @PutMapping("/modify-question") // 서비스 단에 questionid와 member email content, title을 전달해야함
    public ResponseEntity<Boolean> modifyQuestion(@RequestBody QuestionDto questionDto) {
        boolean isTrue = questionService.modifyQuestion(questionDto);
        return ResponseEntity.ok(isTrue);
    }
    // 게시글 삭제
    @DeleteMapping("/delete-question/{id}")
    public ResponseEntity<Boolean> deleteQuestion(@PathVariable("id") Long id) {
        boolean isTrue = questionService.deleteQuestion(id);
        return ResponseEntity.ok(isTrue);
    }
    // 게시글 목록 조회
    @GetMapping("/question-list")
    public ResponseEntity<Map<String, Object>> getQuestionList(@RequestParam(defaultValue = "0") int page,
                                                               @RequestParam(defaultValue = "10") int size) {
        Map<String, Object> list = questionService.getQuestionList(page, size);
        return ResponseEntity.ok(list);
    }
    // 페이지 리스트 조회
    @GetMapping("/page-list")
    public ResponseEntity<Page<QuestionDto>> pageList(@RequestParam(value="page", defaultValue = "0") int page){
        Page<QuestionDto> paging = this.questionService.getPageList(page);
        return ResponseEntity.ok(paging);
    }

    // 게시글 상세 조회
    @GetMapping("/detailed-question/{id}")
    public ResponseEntity<QuestionDto> getBoardDetail(@PathVariable Long id) {
        QuestionDto questionDto = questionService.getDetailedQuestion(id);
        return ResponseEntity.ok(questionDto);
    }
    // 게시글 권한조회
    @PostMapping("check-athority")
    public ResponseEntity<Optional<Authority>> getAuthority(@RequestBody MemberResDto memberResDto) {
        Optional<Authority> authority = questionService.getAuthority(memberResDto);
        return ResponseEntity.ok(authority);
    }
}