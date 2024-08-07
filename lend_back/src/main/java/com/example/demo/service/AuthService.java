package com.example.demo.service;

import com.example.demo.dto.AccessTokenDto;
import com.example.demo.dto.MemberReqDto;
import com.example.demo.dto.MemberResDto;
import com.example.demo.dto.TokenDto;
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
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;

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
    public TokenDto login(MemberReqDto requestDto) {
        UsernamePasswordAuthenticationToken authenticationToken = requestDto.toAuthentication();
        log.info("Authentication Token: {}", authenticationToken);

        try {
            // 비밀번호 검증을 위한 로그 추가
            log.info("Raw Password: {}", requestDto.getPassword());
            log.info("Encoded Password in DB: {}", memberRepository.findByEmail(requestDto.getEmail())
                    .map(Member::getPassword).orElse("Not Found"));

            Authentication authentication = managerBuilder.getObject().authenticate(authenticationToken);
            log.info("Authentication successful: {}", authentication);

            SecurityContextHolder.getContext().setAuthentication(authentication);

            TokenDto tokenDto = tokenProvider.generateTokenDto(authentication);
            log.info("Token DTO: {}", tokenDto);

            Token token = Token.builder()
                    .email(authentication.getName())
                    .refreshToken(tokenDto.getRefreshToken())
                    .build();
            tokenRepository.save(token);

            return tokenDto;
        } catch (BadCredentialsException ex) {
            log.error("Bad credentials provided for user: {}", requestDto.getEmail());
            throw ex;
        } catch (Exception ex) {
            log.error("Authentication failed", ex);
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
//        log.error("사용자 값 : {}", SecurityContextHolder.getContext().getAuthentication().getName());
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
//    public AccessTokenDto reissuedToken(String refreshToken) {
//        Optional<Token> optionalToken = tokenRepository.findByRefreshToken(refreshToken);
//        String email = SecurityContextHolder.getContext().getAuthentication().getName();
//        log.warn("사용자 email : {}", SecurityContextHolder.getContext().getAuthentication());
//        log.warn("사용자 refreshToken : {}", optionalToken.get().getRefreshToken());
//        if (optionalToken.isPresent()) {
//            if (email.equals(optionalToken.get().getEmail())) {
//                AccessTokenDto reissuedAccessToken = tokenProvider.generateAccessTokenDto(tokenProvider.getAuthentication(refreshToken));
//                log.info("재발행 accessToken 값 {}", reissuedAccessToken);
//                return reissuedAccessToken;
//            }
//        }
//        return null;
//    }
}