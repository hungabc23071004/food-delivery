package com.hung.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
public class ShopAddress {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String id;

    // Tọa độ để tính phí ship và khoảng cách
    BigDecimal latitude;   // vĩ độ

    BigDecimal longitude;  // kinh độ

    String fullAddress;
    String detailAddress;
    String ward;
    String wardCode;
    String district;
    String districtId;
    String province;
    String provinceId;


    // Tracking thời gian
    @CreationTimestamp
    LocalDateTime createdAt;

    @UpdateTimestamp
    LocalDateTime updatedAt;

    // Quan hệ với Shop
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "shop_id", nullable = false)
    Shop shop;
}