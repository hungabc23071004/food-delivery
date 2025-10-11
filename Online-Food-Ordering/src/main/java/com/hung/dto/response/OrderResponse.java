package com.hung.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;
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
    String payment;
    BigDecimal totalDiscount;
    List<OrderItemResponse> orderItems= new ArrayList<>();
}
