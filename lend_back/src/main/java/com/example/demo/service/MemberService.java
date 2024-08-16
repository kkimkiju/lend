package com.example.demo.service;

import com.example.demo.dto.MemberReqDto;
import com.example.demo.dto.MemberResDto;
import com.example.demo.entity.Member;
import com.example.demo.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class MemberService {
    private final MemberRepository memberRepository;

    private final PasswordEncoder passwordEncoder;



    public MemberResDto modifyMember(MemberReqDto memberReqDto) {
        Optional<Member> mem = memberRepository.findByEmail(memberReqDto.getEmail());
        System.out.println(mem+ "mem");
        if(mem.isPresent()) {
            Member member = mem.get();
            member.setName(memberReqDto.getName());
            member.setPassword(passwordEncoder.encode(memberReqDto.getPassword()));
            member.setIdentityNumber(memberReqDto.getIdentityNumber());
            member.setIsKakao(memberReqDto.getIsKaKao());
            return MemberResDto.of(memberRepository.save(member));
        }
        else {
            log.error("에러");
            return null;
        }
    }



    // 회원 정보 조회(로그인 한 사용자)
    public MemberResDto getMemberInfo(String email) {
        Member member = memberRepository.findByEmail(email).orElseThrow(
                () -> new RuntimeException("해당 회원이 존재하지 않습니다.")
        );
        return MemberResDto.of(member);
    }

    // 회원 삭제
    public boolean deleteMember(String email) {
        try {
            Member member = memberRepository.findByEmail(email).orElseThrow(
                    () -> new RuntimeException("해당 회원이 존재하지 않습니다.")
            );
            memberRepository.delete(member);
            return true;
        } catch (RuntimeException e) {
            return false;
        }
    }


    // 회원 정보 전체 조회
//    public List<MemberDto> getMemberList(){
//        List<Member> members = memberRepository.findAll();
//        List<MemberDto> memberDtos = new ArrayList<>();
//        for(Member member : members) {
//            memberDtos.add(MemberDto.of(member));
//        }
//        return memberDtos;
//    }

//    public Optional<MemberDto> findByEmail(String email) {
//        Optional<Member> member = memberRepository.findById(email);
//        return member.map(MemberDto::of);
//    }

}
