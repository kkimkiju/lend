package com.example.demo.service;

import com.example.demo.dto.KakaoDto;
import com.example.demo.entity.Kakao;
import com.example.demo.entity.Member;
import com.example.demo.repository.KakaoRepository;
import com.example.demo.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;


@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class KakaoService {
    private final MemberRepository memberRepository;
    private final RestTemplate restTemplate;
    private final KakaoRepository kakaoRepository;
    private final PasswordEncoder passwordEncoder;

    public Map<String, Object> kakaoUserInfo (String kakaoToken) {
        Map<String, Object> kakaoInfo = new HashMap<>();

        HttpHeaders headers = new HttpHeaders();
        headers.set("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
        headers.set("Authorization", "Bearer " + kakaoToken);

        String url = "https://kapi.kakao.com/v2/user/me";

        try {
            ResponseEntity<KakaoDto> responseEntity = restTemplate.exchange(
                    url,
                    HttpMethod.GET,
                    new HttpEntity<>(headers),
                    KakaoDto.class
            );
            log.info("responseEntity.getBody value : {}", responseEntity.getBody());
            KakaoDto kakaoDto = responseEntity.getBody();
            boolean isExist = false;
            if (kakaoDto != null) {
                isExist = memberRepository.existsByEmail(kakaoDto.getKakaoAccount().getEmail());

                log.info("kakaoId exists? : {}",isExist);
                String kakaoEmail = kakaoDto.getKakaoAccount().getEmail();
                log.info("kakaoEmail? : {}",kakaoEmail);
                if(memberRepository.existsByEmail(kakaoEmail) && !isExist) {
                    log.error("카카오 : 이미 가입된 이메일 입니다.");
                    throw new RuntimeException("카카오 : 이미 가입된 이메일 입니다");
                }

                if(!isExist){
                    saveKakaoEntity(kakaoDto);

                }
                else {
                    log.info("kakaoDto.getKakaoAccount().getEmail() :" + kakaoDto.getKakaoAccount().getEmail());
                    isExist = memberRepository.existsByEmail(kakaoDto.getKakaoAccount().getEmail());
                }
            }
            kakaoInfo.put("isMember", isExist);
            kakaoInfo.put("userInfo", kakaoDto);

            return kakaoInfo;
        }catch(Exception e) {
            log.error("카카오 가입 시도 중 오류 발생(카카오 서비스)");
            return null;
        }
    }

    private void saveKakaoEntity(KakaoDto kakaoDto) {
        Member member = kakaoDto.toEntity(passwordEncoder);
        log.info("saveKakaoEntity 실행 : " + member);
        memberRepository.save(member);
    }

}