//MemberController.java
package com.example.demo.controller;



import com.example.demo.dto.MemberReqDto;
import com.example.demo.dto.MemberResDto;
import com.example.demo.repository.MemberRepository;
import com.example.demo.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/members")
@RequiredArgsConstructor
public class MemberController {
    private final MemberService memberService;
    private final MemberRepository memberRepository;

    private final PasswordEncoder passwordEncoder;



    // 회원정보 가져오기
    @GetMapping("/memberinfo")
    public ResponseEntity<MemberResDto> memberInfo (){
        MemberResDto memberDto = memberService.getMemberInfo(SecurityContextHolder.getContext().getAuthentication().getName());
        return ResponseEntity.ok(memberDto);
    }
    // 회원정보 수정
    @PostMapping("/membermodify")
    public ResponseEntity<MemberResDto> memberModify(@RequestBody MemberReqDto memberReqDto) {
        return ResponseEntity.ok(memberService.modifyMember(memberReqDto));
    }

    // 회원 삭제
    @GetMapping("/delmember")
    public ResponseEntity<Boolean> memberDelete() {
        boolean isTrue = memberService.deleteMember(SecurityContextHolder.getContext().getAuthentication().getName());
        return ResponseEntity.ok(isTrue);
    }

//    @GetMapping("/list")
//    public ResponseEntity<List<MemberDto>> memberList(){
//        List<MemberDto> list = memberService.getMemberList();
//        return ResponseEntity.ok(list);
//    }

}
