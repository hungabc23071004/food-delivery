package com.hung.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
public class ShippingAddress {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String id;
    String fullAddress;
    String detailAddress;
    String receiverName;
    String phoneNumber;
    String ward;
    String district;
    String province;
    String note;
    @Column(nullable = false, precision = 10, scale = 7)
    BigDecimal latitude;   // vĩ độ

    @Column(nullable = false, precision = 10, scale = 7)
    BigDecimal longitude;  // kinh độ

    @OneToOne(mappedBy = "shippingAddress")
    Order order;
}
