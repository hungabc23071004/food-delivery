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
     String id;
     String fullAddress;
     String detailAddress;
     String receiverName;
     String phoneNumber;
     String note;
     boolean defaultAddress;
     BigDecimal latitude;
     BigDecimal longitude;
     String addressType;
    String ward;
    String wardCode;
    String district;
    String districtId;
    String province;
    String provinceId;
}
