package com.hung.dto.request;

import com.hung.entity.Address;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class OrdersRequest {
    Long restaurantId;
    AddressRequest deliveryAddress;

}
