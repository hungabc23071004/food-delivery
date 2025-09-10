package com.hung.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ShopAddressRequest {
     String fullAddress;
     String detailAddress;
     String phoneNumber;
     BigDecimal latitude;
     BigDecimal longitude;
     String ward;
     String wardCode;
     String district;
     String districtId;
     String province;
     String provinceId;


}
