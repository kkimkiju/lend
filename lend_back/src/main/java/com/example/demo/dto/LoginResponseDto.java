package com.example.demo.dto;

import java.util.List;

public class LoginResponseDto {
    private TokenDto tokenDto;
    private List<String> authorities;

    // 생성자, getter, setter

    public LoginResponseDto(TokenDto tokenDto, List<String> authorities) {
        this.tokenDto = tokenDto;
        this.authorities = authorities;
    }

    public TokenDto getTokenDto() {
        return tokenDto;
    }

    public void setTokenDto(TokenDto tokenDto) {
        this.tokenDto = tokenDto;
    }

    public List<String> getAuthorities() {
        return authorities;
    }

    public void setAuthorities(List<String> authorities) {
        this.authorities = authorities;
    }
}
