package com.example.demo.controller;

import com.example.demo.dto.*;
import com.example.demo.service.AuthService;
import com.example.demo.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@Slf4j
public class AuthController {
    private final AuthService authService;
    private final MemberService memberService;

    // 회원 여부 확인
    @GetMapping("/check")
    public ResponseEntity<Boolean> isMember(@RequestParam String email) {
        boolean isEmail = authService.isMember(email);
        return ResponseEntity.ok(isEmail);
    }
    @PostMapping("/signup")
    public ResponseEntity<MemberResDto> signup(@RequestBody MemberReqDto requestDto) {
        return ResponseEntity.ok(authService.signup(requestDto));
    }
    @PostMapping("/login")
    public ResponseEntity<LoginResponseDto> login(@RequestBody MemberReqDto requestDto) {
        return ResponseEntity.ok(authService.login(requestDto));
    }
    @PostMapping("/membermodify")
    public ResponseEntity<MemberResDto> memberModify(@RequestBody MemberReqDto memberReqDto) {
        return ResponseEntity.ok(memberService.getKakaoInfo(memberReqDto));
    }
    @GetMapping("/pw/{name}/{email}")
    public ResponseEntity<Boolean> findByNameAndEmail(@PathVariable String name,@PathVariable String email){
        boolean isTrue  = memberService.findByNameAndEmail(name,email);
        return ResponseEntity.ok(isTrue);
    }
    @PostMapping("/pw/new")
    public ResponseEntity<Boolean> getNewPw(@RequestBody MemberResDto memberResDto){
        boolean isTrue  = memberService.findByNameAndEmail(memberResDto);
        return ResponseEntity.ok(isTrue);
    }
    // 아이디 찾기
//    @PostMapping("/findid")
//    public ResponseEntity <String> findId(@RequestBody MemberDto memberDto) {
//        String email = authService.findId(memberDto);
//        return ResponseEntity.ok(email);
//    }
//
//    // 비밀번호 찾기(비밀번호 변경)
//    @PostMapping("/findpw")
//    public ResponseEntity<MemberResDto> changePassword(@RequestBody MemberReqDto memberReqDto) {
//        return ResponseEntity.ok(authService.findPassword(memberReqDto));
//    }
//
    @PostMapping("/reissued")
    public ResponseEntity<AccessTokenDto> newToken(@RequestBody String refreshToken) {
        log.info("refreshToken : {}", refreshToken);
        return ResponseEntity.ok(authService.reissuedToken(refreshToken));
    }
}