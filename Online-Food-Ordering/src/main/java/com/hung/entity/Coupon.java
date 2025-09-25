package com.hung.entity;

import com.hung.enums.CouponType;
import com.hung.enums.DiscountType;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Coupon {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String id;

    String code;

    @Enumerated(EnumType.STRING)
    CouponType couponType;

    @Enumerated(EnumType.STRING)

    DiscountType discountType;
    BigDecimal discount;
    BigDecimal minOrder;
    LocalDate startDate;
    LocalDate endDate;
    BigDecimal quantity;
    BigDecimal used;
    boolean active;
    boolean requireCode;

    @Builder.Default
    @ManyToMany
    @JoinTable(
            joinColumns = @JoinColumn(name = "coupon_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    List<User> users= new ArrayList<>();
    @Builder.Default
    @ManyToMany(mappedBy = "coupons")
    List<Order> orders= new ArrayList<>();
//    @Builder.Default
//    @ManyToMany(mappedBy = "coupons")
//    List<OrderShopGroup> orderShopGroups = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "shop_id")
    Shop shop;
}