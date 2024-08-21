package com.example.demo.dto;

import com.example.demo.constant.Authority;
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
public class NaverDto {
    private String resultcode;
    private String message;

    @JsonProperty("response")
    private Response response;

    @Data
    public static class Response {
        private String id;
        private String nickname;
        private String name;
        private String email;
        private String gender;
        private String age;
        private String birthday;
        private String profile_image;
        private String birthyear;
        private String mobile;

        @JsonProperty("profile_image")
        public String getProfileImage() {
            return profile_image;
        }

//        public void setProfileImage(String profile_image) {
//            this.profile_image = profile_image;
//        }
    }

    public NaverDto() {}

    public Member toEntity(PasswordEncoder passwordEncoder) {
        return Member.builder()
                .password(passwordEncoder.encode(response.id))
                .email(response.getEmail())
                .profileImgPath(response.getProfile_image())
                .authority(Authority.ROLE_USER)
                .build();
    }
}
