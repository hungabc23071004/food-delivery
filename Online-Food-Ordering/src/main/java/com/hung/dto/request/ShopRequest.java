package com.hung.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ShopRequest {
   String name;

   String description;

    @NotNull(message = "Opening time is required")
    LocalTime openingTime;

    @NotNull(message = "Closing time is required")
    LocalTime closingTime;

    // Địa chỉ của shop
    @NotNull(message = "Shop address is required")
    private ShopAddressRequest shopAddress;

    String phoneNumber;

}
