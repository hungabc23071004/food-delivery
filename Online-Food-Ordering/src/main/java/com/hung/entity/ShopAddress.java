package com.hung.entity;

import jakarta.persistence.*;
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

    // Địa chỉ đầy đủ (VD: 123 Lý Thường Kiệt, Quận 10, TP.HCM)
    @Column(nullable = false)
    String fullAddress;

    // Thông tin bổ sung (tầng, tòa nhà, số phòng...)
    String detailAddress;

    // Ghi chú thêm (VD: "Cửa hàng nằm trong khu chợ")
    String note;

    // Tọa độ để tính phí ship và khoảng cách
    @Column(nullable = false, precision = 10, scale = 7)
    BigDecimal latitude;   // vĩ độ

    @Column(nullable = false, precision = 10, scale = 7)
    BigDecimal longitude;  // kinh độ


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