package com.example.demo.service;

import com.example.demo.dto.KakaoDto;
import com.example.demo.dto.NaverDto;
import com.example.demo.entity.Member;
import com.example.demo.repository.MemberRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class NaverService {
    private final MemberRepository memberRepository;
    private final RestTemplate restTemplate;
    private final PasswordEncoder passwordEncoder;
    private final String CLIENT_ID = "ZA8r5FN2jztp7YcszStq";
    private final String CLIENT_SECRET = "ION77W72Wk";
    private final String REDIRECT_URI = "http://localhost:3000/lend";


    // 접근코드 발급
    public String getAccessTokenFromCode(String code,String state) {
        try {
        String url = "https://nid.naver.com/oauth2.0/token";

        MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
        body.add("grant_type", "authorization_code");
        body.add("client_id", CLIENT_ID);
        body.add("client_secret",CLIENT_SECRET);
        body.add("state", state);
        body.add("code", code);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        HttpEntity<MultiValueMap<String, String>> entity = new HttpEntity<>(body, headers);
        ResponseEntity<Map> responseEntity = restTemplate.postForEntity(url, entity, Map.class);

        Map<String, String> responseBody = responseEntity.getBody();
            return responseBody.get("access_token");
        } catch (Exception e) {
            System.err.println("Failed to retrieve access token: " + e.getMessage());
            e.printStackTrace();
            throw new RuntimeException("Failed to retrieve access token", e);
        }
    }
    public Map<String, Object> naverLoginCode(String accessToken) {
        Map<String, Object> naverInfo = new HashMap<>();
        try {
            String url = "https://openapi.naver.com/v1/nid/me";
            HttpHeaders headers = new HttpHeaders();
            headers.set("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
            headers.set("Authorization", "Bearer " + accessToken);

            ResponseEntity<NaverDto> responseEntity = restTemplate.exchange(
                    url,
                    HttpMethod.GET,
                    new HttpEntity<>(headers),
                    NaverDto.class
            );
            NaverDto naverDto = responseEntity.getBody();
            boolean isExist = false;
            if (naverDto != null) {
                String email = naverDto.getResponse().getEmail();
                isExist = checkIfEmailExists(email); // Implement this method
                if(memberRepository.existsByEmail(email) && !isExist) {
                    log.error("카카오 : 이미 가입된 이메일 입니다.");
                    throw new RuntimeException("카카오 : 이미 가입된 이메일 입니다");
                }
                if(!isExist){
                    saveNaverEntity(naverDto);
                }
                else {
                    log.info("kakaoDto.getKakaoAccount().getEmail() :" + naverDto.getResponse().getEmail());
                    isExist = memberRepository.existsByEmail(naverDto.getResponse().getEmail());
                }
            }
            naverInfo.put("isMember", isExist);
            naverInfo.put("userInfo", naverDto);
            naverInfo.put("accToken", accessToken);
            return naverInfo;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    private boolean checkIfEmailExists(String email) {
        return memberRepository.existsByEmail(email);
    }
    private void saveNaverEntity(NaverDto naverDto) {
        Member member = naverDto.toEntity(passwordEncoder);
        log.info("savenaverEntity 실행 : " + member);
        memberRepository.save(member);
    }
}
