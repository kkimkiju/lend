package com.example.demo.service;

import com.example.demo.dto.*;
import com.example.demo.entity.Member;
import com.example.demo.entity.Token;
import com.example.demo.jwt.TokenProvider;
import com.example.demo.repository.MemberRepository;
import com.example.demo.repository.TokenRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class AuthService {
    private final AuthenticationManagerBuilder managerBuilder; // 인증을 담당하는 클래스
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenProvider tokenProvider;
    private final TokenRepository tokenRepository;

    // 회원 가입 여부 확인
    public boolean isMember(String email) {
        return memberRepository.existsByEmail(email);
    }

    public MemberResDto signup(MemberReqDto requestDto) {
        if (memberRepository.existsByEmail(requestDto.getEmail())) {
            throw new RuntimeException("이미 가입되어 있는 유저입니다");
        }
        Member member = requestDto.toEntity(passwordEncoder);
        System.out.println(member + " password 인코더" + " , " + member.getPassword());
        return MemberResDto.of(memberRepository.save(member));
    }
    //로그인
    public LoginResponseDto login(MemberReqDto requestDto) {
        UsernamePasswordAuthenticationToken authenticationToken = requestDto.toAuthentication();
        log.info("Authentication Token: {}", authenticationToken);
        try {
            Authentication authentication = managerBuilder.getObject().authenticate(authenticationToken);

            // authorities를 String 리스트로 변환
            List<String> authorities = authentication.getAuthorities().stream()
                    .map(GrantedAuthority::getAuthority)
                    .collect(Collectors.toList());

            for (String authority : authorities) {
                System.out.println("Authority: " + authority);
            }

            SecurityContextHolder.getContext().setAuthentication(authentication);
            TokenDto tokenDto = tokenProvider.generateTokenDto(authentication);
            log.info("Token DTO: {}", tokenDto);

            Token token = Token.builder()
                    .email(authentication.getName())
                    .refreshToken(tokenDto.getRefreshToken())
                    .build();
            tokenRepository.save(token);
            System.out.println(token.getRefreshToken());

            // 수정된 부분: authorities를 String 리스트로 반환
            return new LoginResponseDto(tokenDto, authorities);
        } catch (BadCredentialsException ex) {
            log.error("잘못된 자격 증명이 제공되었습니다: {}", requestDto.getEmail());
            throw ex;
        } catch (Exception ex) {
            log.error("인증 실패", ex);
            throw ex;
        }
    }




//    public TokenDto login(MemberReqDto requestDto) {
//        UsernamePasswordAuthenticationToken authenticationToken = requestDto.toAuthentication();
//        log.error("authenticationToken 값 : {}", managerBuilder.getObject().authenticate(authenticationToken));
//        Authentication authentication = managerBuilder.getObject().authenticate(authenticationToken);
//        SecurityContextHolder.getContext().setAuthentication(authentication);
//
//        // 토큰으로 아이디 불러오기
//           log.error("사용자 값 : {}", SecurityContextHolder.getContext().getAuthentication().getName());
//
//        TokenDto tokenDto = tokenProvider.generateTokenDto(authentication);
//        String email = SecurityContextHolder.getContext().getAuthentication().getName();
//        log.warn("Token Entity 저장할 email : {}", email);
//        Token token = Token.builder()
//                .email(email)
//                .refreshToken(tokenDto.getRefreshToken())
//                .build();
//        tokenRepository.save(token);
//        return tokenDto;
//    }
//
//    // 아이디 찾기
//    public String findId(MemberDto memberDto) {
//        Optional<Member> member = memberRepository.findByNameAndIdentityNumber(memberDto.getName(), memberDto.getIdentityNumber());
//        log.warn("이름 : {}", memberDto.getName());
//        log.warn("주민번호 : {}", memberDto.getIdentityNumber());
//        String email = member.get().getEmail();
//        return email;
//    }

    // 비밀번호 찾기(비밀번호 변경)
    public MemberResDto findPassword(MemberReqDto memberReqDto) {
        Optional<Member> member = memberRepository.findByEmail(memberReqDto.getEmail());
        if (member.isPresent()) {
            Member member1 = member.get();
            member1.setPassword(passwordEncoder.encode(memberReqDto.getPassword()));
            memberRepository.save(member1);
            return MemberResDto.of(member1);
        }
        else {
            return null;
        }
    }


//    // RefreshToken 이용하여 AccessToken 재발급
    public AccessTokenDto reissuedToken(String refreshToken) {
        Optional<Token> optionalToken = tokenRepository.findByRefreshToken(refreshToken);
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        log.warn("사용자 email : {}", SecurityContextHolder.getContext().getAuthentication());
        log.warn("사용자 refreshToken : {}", optionalToken.get().getRefreshToken());
        if (optionalToken.isPresent()) {
            if (email.equals(optionalToken.get().getEmail())) {
                AccessTokenDto reissuedAccessToken = tokenProvider.generateAccessTokenDto(tokenProvider.getAuthentication(refreshToken));
                log.info("재발행 accessToken 값 {}", reissuedAccessToken);
                return reissuedAccessToken;
            }
        }
        return null;
    }
}