package com.hung.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.hung.constant.PredefinedRole;
import com.hung.entity.Role;
import com.hung.entity.User;
import com.hung.enums.AuthProvider;
import com.hung.exception.AppException;
import com.hung.exception.ErrorCode;
import com.hung.repository.RoleRepository;
import com.hung.repository.UserRepository;
import com.hung.service.AuthenticationService;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.*;

@Component
@RequiredArgsConstructor
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class OAuth2LoginSuccessHandler implements AuthenticationSuccessHandler {

    UserRepository userRepository;
    RoleRepository roleRepository;
    AuthenticationService authenticationService;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication) throws IOException, ServletException {
        OAuth2AuthenticationToken authToken = (OAuth2AuthenticationToken) authentication;
        OAuth2User oAuth2User = authToken.getPrincipal();

        // ✅ Lấy provider từ registrationId
        String providerName = authToken.getAuthorizedClientRegistrationId(); // "google" | "facebook"
        AuthProvider provider = AuthProvider.valueOf(providerName.toUpperCase());

        // ✅ Lấy providerId (Google dùng "sub", Facebook dùng "id")
        String providerId = oAuth2User.getAttribute("sub");
        if (providerId == null) providerId = oAuth2User.getAttribute("id");

        String email = oAuth2User.getAttribute("email");
        String fullName = oAuth2User.getAttribute("name");

        // ✅ Kiểm tra DB
        String finalProviderId = providerId;
        User user = userRepository.findByProviderAndProviderId(provider, providerId)
                .orElseGet(() -> {
                    User newUser = User.builder()
                            .providerId(finalProviderId)
                            .provider(provider)
                            .email(email)
                            .fullName(fullName)
                            .active(true)
                            .build();

                    // Tạo username ngẫu nhiên
                    String shortUuid = UUID.randomUUID().toString().substring(0, 8);
                    newUser.setUsername("food_" + shortUuid);

                    List<Role> roles = new ArrayList<>();
                    roleRepository.findById(PredefinedRole.USER_ROLE).ifPresent(roles::add);
                    newUser.setRoles(roles);

                    return userRepository.save(newUser);
                });

        User loginUser = userRepository.findByProviderAndProviderId(provider,finalProviderId).orElseThrow(()-> new AppException(ErrorCode.USER_NOT_EXISTED));
        String token = authenticationService.generateToken(loginUser);

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        new ObjectMapper().writeValue(response.getWriter(), Map.of("accessToken", token));
    }



}
