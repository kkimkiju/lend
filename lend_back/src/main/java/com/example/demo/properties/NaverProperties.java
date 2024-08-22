package com.example.demo.properties;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "spring.datasource.naver")
@Getter
@Setter
public class NaverProperties {
    private String clientId;
    private String clientSecret;
    private String redirectUri;
    private String callbackUrl;
    private String infoUrl;
}

