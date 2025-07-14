package com.hung.dto.request;

import com.hung.enums.USER_ROLE;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserCreateRequest {
    @NotBlank
    @Size(min = 6, message = "USER_NAME_WRONG")

    private String fullName;

    @Email
    @NotBlank
    private String email;

    @Size(min = 6, message = "PASSWORD_WRONG")
    private String password;

    private USER_ROLE role;
}
