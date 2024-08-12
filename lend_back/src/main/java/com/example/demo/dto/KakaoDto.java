package com.example.demo.dto;


import com.fasterxml.jackson.annotation.JsonProperty;
import com.totalprj.movieverse.entity.Kakao;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Builder
@Data
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class KakaoDto {
    private Long id;

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

    public Kakao toEntity() {
        return Kakao.builder()
                .id(id)
                .email(kakaoAccount.getEmail())
                .profile(kakaoAccount.getProfile().getProfileImageUrl())
                .build();
    }
}
