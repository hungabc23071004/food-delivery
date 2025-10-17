package com.hung.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class OrderResponse {
    String id;
    BigDecimal total;
    BigDecimal shippingFee;
    Double  subtotal;
    String status;
    LocalDateTime createdAt;
    String payment;
    BigDecimal totalDiscount;
    String shopName;
    ShippingAddressResponse shippingAddress;
    List<OrderItemResponse> orderItems= new ArrayList<>();
}
