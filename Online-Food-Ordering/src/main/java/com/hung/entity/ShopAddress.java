package com.hung.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ShopAddress {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String id;
    String phoneNumber;
    String fullAddress;
    String detailAddress;
    String ward;
    String district;
    String province;
    String note;
    @OneToOne
    @JoinColumn(name = "shop_id")
    Shop shop;

}