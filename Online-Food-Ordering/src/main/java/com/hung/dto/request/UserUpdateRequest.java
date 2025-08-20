package com.hung.dto.request;

import jakarta.validation.constraints.Size;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.util.List;


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserUpdateRequest {
        String oldPassword;
        @Size(min = 6, message = "INVALID_PASSWORD")
        String password;
        String repeatPassword;
        String fullName;
        String email;
        String phone;

        LocalDate dob;

        List<String> roles;
    }

