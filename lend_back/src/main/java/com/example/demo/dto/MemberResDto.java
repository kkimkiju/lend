package com.example.demo.dto;

import com.example.demo.constant.Authority;
import com.example.demo.entity.Member;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MemberResDto {
    private String email;
    private String password;
    private String name;
    private String identityNumber;
    private Authority authority;


    public static MemberResDto of(Member member) {
        return MemberResDto.builder()
                .email(member.getEmail())
                .name(member.getName())
                .password(member.getPassword())
                .identityNumber(member.getIdentityNumber())
                .authority(member.getAuthority())
//                .nickname(member.getNickname())
//                .profileImgPath(member.getProfileImgPath())
//                .skill(member.getSkill())
//                .myInfo(member.getMyInfo())
                .build();

    }
}



