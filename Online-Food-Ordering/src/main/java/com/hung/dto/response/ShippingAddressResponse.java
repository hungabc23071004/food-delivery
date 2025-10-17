package com.hung.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ShippingAddressResponse {
    String id;
    String fullAddress;
    String detailAddress;
    String receiverName;
    String phoneNumber;
    String ward;
    String district;
    String province;
    String note;
}
