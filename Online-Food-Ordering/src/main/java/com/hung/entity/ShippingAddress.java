package com.hung.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

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
    String city;
    @OneToOne
    @JoinColumn(name = "order_id")
    Order order;
}
