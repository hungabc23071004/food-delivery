package com.hung.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class OrdersResponse {
        AddressResponse deliveryAddress;

        Long totalItem;

        List<OrderItemResponse> items = new ArrayList<>();

        Long totalPrice;

        Long totalAmount;

        String orderStatus;

}
