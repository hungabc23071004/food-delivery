package com.hung.dto.response;


import lombok.*;
import lombok.experimental.FieldDefaults;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ShoppAddressResponse {
     String fullAddress;
     String detailAddress;
     String phoneNumber;
     String ward;
     String district;
     String province;
}
