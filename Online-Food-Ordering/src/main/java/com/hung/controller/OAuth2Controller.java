package com.hung.controller;

import com.hung.dto.response.ApiResponse;
import com.hung.service.OAuth2AuthenticationService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth/oath2")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class OAuth2Controller {

    OAuth2AuthenticationService oAuth2AuthenticationService;

    @GetMapping("/callback/{provider}")
    public ApiResponse<String > oauth2Callback(@PathVariable String provider, OAuth2AuthenticationToken authentication) {
        OAuth2User oAuth2User = authentication.getPrincipal();
        return ApiResponse.<String>builder()
                .result(oAuth2AuthenticationService.processOAuth2User(oAuth2User, provider))
                .build();
    }
}
