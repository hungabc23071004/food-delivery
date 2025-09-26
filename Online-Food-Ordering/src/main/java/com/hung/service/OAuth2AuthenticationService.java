package com.hung.service;

import com.hung.constant.PredefinedRole;
import com.hung.entity.Role;
import com.hung.entity.User;
import com.hung.enums.AuthProvider;
import com.hung.repository.RoleRepository;
import com.hung.repository.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class OAuth2AuthenticationService {
    UserRepository userRepository;
    AuthenticationService authenticationService;
    RoleRepository roleRepository;


        public String processOAuth2User(OAuth2User oAuth2User, String providerName) {

            // Lấy providerId
            String providerId = oAuth2User.getAttribute("sub"); // Google
            if (providerId == null) providerId = oAuth2User.getAttribute("id"); // Facebook fallback

            // Lấy thông tin user
            String email = oAuth2User.getAttribute("email");
            String fullName = oAuth2User.getAttribute("name");
            AuthProvider provider = AuthProvider.valueOf(providerName.toUpperCase());

            // Kiểm tra user trong DB
            String finalProviderId = providerId;
            User user = userRepository.findByProviderAndProviderId(provider, providerId)
                    .orElseGet(() -> {
                        User newUser = User.builder()
                                .providerId(finalProviderId)
                                .provider(provider)
                                .email(email)
                                .fullName(fullName)
                                .build();

                        // Tạo username duy nhất: "food_" + 8 ký tự UUID
                        String shortUuid = UUID.randomUUID().toString().substring(0, 8);
                        newUser.setUsername("food_" + shortUuid);
                        List<Role> roles = new ArrayList<>();
                        roleRepository.findById(PredefinedRole.USER_ROLE).ifPresent(roles::add);
                        newUser.setRoles(roles);
                        return userRepository.save(newUser);
                    });


            return authenticationService.generateToken(user);
        }
    }


