package com.example.demo.controller;

import com.example.demo.dto.NaverDto;
import com.example.demo.dto.NaverTokenDto;
import com.example.demo.service.NaverService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/naver")
@RequiredArgsConstructor
public class NaverController {
    private final NaverService naverService;

    @PostMapping("/token")
    public ResponseEntity<Map<String, Object>> getNaverToken(@RequestBody NaverTokenDto naverDto) {
        String accessToken = naverService.getAccessTokenFromCode(naverDto.getCode(),naverDto.getState());
        Map<String, Object> naverUserInfo = naverService.naverLoginCode(accessToken);
        return ResponseEntity.ok(naverUserInfo);
    }
}
