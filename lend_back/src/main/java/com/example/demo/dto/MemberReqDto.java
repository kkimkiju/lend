package com.example.demo.dto;


import com.example.demo.constant.Authority;
import com.example.demo.entity.Member;
import lombok.*;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;



@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor

public class MemberReqDto {
    private String email;
    private String password;
    private String name;
    private String identityNumber;
    private Boolean isSocial;

    public Member toEntity(PasswordEncoder passwordEncoder) {
        return Member.builder()
                .email(email)
                .password(passwordEncoder.encode(password))
                .identityNumber(identityNumber)
                .name(name)
                .isSocial(isSocial)
                .authority(Authority.ROLE_USER)
                .build();
    }



    public void updateMember(Member member, PasswordEncoder passwordEncoder) {
        Member.builder()
                .password(password != null && !password.isEmpty() ? passwordEncoder.encode(password) : member.getPassword())
//                .nickname(nickname != null ? nickname : member.getNickname())
//                .profileImgPath(profileImgPath != null ? profileImgPath : member.getProfileImgPath())
//                .skill(skill != null ? String.join(",", skill) : member.getSkill())
//                .myInfo(myInfo != null ? myInfo : member.getMyInfo())
                .authority(Authority.ROLE_USER)
                .build();
    }



    public UsernamePasswordAuthenticationToken toAuthentication() {
        System.out.println("UsernamePasswordAuthenticationToken 실행"+ password);
        return new UsernamePasswordAuthenticationToken(email, password);
    }
}