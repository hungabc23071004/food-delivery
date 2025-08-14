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
public class UserAddress {
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
    String note;
    boolean defaultAddress;
    @ManyToOne
    @JoinColumn(name = "user_id")
    User user;
}
