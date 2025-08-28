package com.hung.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
@Table(name = "user_address")
public class UserAddress {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String id;

    // Địa chỉ đầy đủ (VD: 123 Lý Thường Kiệt, Quận 10, TP.HCM)
    @Column(nullable = false)
    String fullAddress;

    // Thông tin bổ sung (tầng, tòa nhà, số phòng...)
    String detailAddress;

    // Người nhận hàng
    @Column(nullable = false)
    String receiverName;

    // SĐT liên hệ
    @Column(nullable = false, length = 20)
    String phoneNumber;

    // Ghi chú thêm cho shipper
    String note;

    // Có phải địa chỉ mặc định không?
    @Column(nullable = false)
    boolean defaultAddress;

    // Tọa độ để tính phí ship (bắt buộc khi dùng Grab API hoặc tự tính khoảng cách)
    @Column(nullable = false, precision = 10, scale = 7)
    BigDecimal latitude;   // vĩ độ

    @Column(nullable = false, precision = 10, scale = 7)
    BigDecimal longitude;  // kinh độ

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

    @Enumerated(EnumType.STRING)
    AddressType addressType;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    User user;
}
