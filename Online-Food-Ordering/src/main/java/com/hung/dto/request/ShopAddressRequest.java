package com.hung.dto.request;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ShopAddressRequest {
    String fullAddress;
    String detailAddress;
    String note;
    BigDecimal latitude;
    BigDecimal longitude;

}
