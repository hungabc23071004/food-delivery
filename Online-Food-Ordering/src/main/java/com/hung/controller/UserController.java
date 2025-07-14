package com.hung.controller;

import com.hung.dto.request.UserCreateRequest;
import com.hung.dto.response.ApiResponse;
import com.hung.dto.response.UserResponse;
import com.hung.service.UserService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class UserController {
    UserService userService;
    @PostMapping("/signup")
    ApiResponse<UserResponse> createAccount(@RequestBody @Valid UserCreateRequest request) {
        log.info("Controller: create user");
        return ApiResponse.<UserResponse>builder()
                .result(userService.creatAccount(request))
                .build();
    }

}
