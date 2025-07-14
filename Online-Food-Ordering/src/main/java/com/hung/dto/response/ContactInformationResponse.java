package com.hung.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ContactInformationResponse {
    String email;
    String mobile;
    String fb;
    String instagram;
}
