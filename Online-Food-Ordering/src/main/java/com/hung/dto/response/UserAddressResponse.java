package com.hung.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserAddressResponse {
    private String id;
    private String fullAddress;
    private String detailAddress;
    private String receiverName;
    private String phoneNumber;
    private String note;
    private boolean defaultAddress;
    private BigDecimal latitude;
    private BigDecimal longitude;
    private String addressType;
}
