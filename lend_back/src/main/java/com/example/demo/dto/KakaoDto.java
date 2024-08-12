package com.example.demo.dto;


import com.example.demo.constant.Authority;
import com.example.demo.entity.Kakao;
import com.example.demo.entity.Member;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import org.springframework.security.crypto.password.PasswordEncoder;

@Builder
@Data
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class KakaoDto {
    private String id;

    @JsonProperty("kakao_account")
    private KakaoAccount kakaoAccount;

    @Data
    public static class KakaoAccount {
        private String email;
        private Profile profile;

        @Data
        public static class Profile {
            @JsonProperty("profile_image_url")
            private String profileImageUrl;
        }
    }

    public KakaoDto() {}

    public Member toEntity(PasswordEncoder passwordEncoder) {
        return Member.builder()
                .password(passwordEncoder.encode(id))
                .email(kakaoAccount.getEmail())
                .profileImgPath(kakaoAccount.getProfile().getProfileImageUrl())
                .authority(Authority.ROLE_USER)
                .build();
    }
}
