package com.hung.controller;

import com.hung.dto.request.UserCreationRequest;
import com.hung.dto.response.ApiResponse;
import com.hung.dto.response.UserResponse;
import com.hung.service.UserService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class UserController {

    UserService userService;

    @PostMapping
    ApiResponse<UserResponse> createUser(@RequestBody @Valid UserCreationRequest request) throws Exception {
        return ApiResponse.<UserResponse>builder()
                .result(userService.createUser(request))
                .build();
    }

    @GetMapping ("/verification")
    ApiResponse<?> activeUser(@RequestParam String username, @RequestParam String token) {
        userService.activeUser(username, token);
        return ApiResponse.builder()
                .result("success")
                .build();
    }


}
