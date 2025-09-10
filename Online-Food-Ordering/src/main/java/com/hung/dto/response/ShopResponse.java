package com.hung.dto.response;

import com.hung.entity.ShopAddress;
import jakarta.persistence.Column;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ShopResponse {
    String id;
    String name;
    String phoneNumber;
    String description;
    String logo;
    String banner;
    LocalTime openingTime;
    LocalTime closingTime;
    ShoppAddressResponse shopAddress;

}
