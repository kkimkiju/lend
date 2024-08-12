package com.totalprj.movieverse.controller;

import com.totalprj.movieverse.dto.KakaoDto;
import com.totalprj.movieverse.service.KakaoService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/kakao")
@RequiredArgsConstructor
public class KakaoController {
    private final KakaoService kakaoService;

    // 카카오로 회원가입 여부
    @PostMapping("/ismember")
    public ResponseEntity<Map<String, Object>> isMember(@RequestBody String kakaoToken) {
        log.info("Received Kakao token: {}", kakaoToken);
        Map<String, Object> response = kakaoService.kakaoUserInfo(kakaoToken);
        log.info("respone : {}", response);
        return ResponseEntity.ok(response);
    }
}
