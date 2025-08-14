package com.hung.entity;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String id;
    BigDecimal total;
    BigDecimal shippingFee;
    BigDecimal subtotal;
    BigDecimal totalDiscount;

    @CreationTimestamp
    @Column(updatable = false)
    LocalDateTime createdAt;

    @ManyToOne
    @JoinColumn(name = "user_id")
    User user;

    @Builder.Default
    @ManyToMany
    @JoinTable(
            joinColumns = @JoinColumn(name = "order_id"),
            inverseJoinColumns = @JoinColumn(name = "coupon_id")
    )
    List<Coupon> coupons= new ArrayList<>();

    @Builder.Default
    @OneToMany(fetch = FetchType.LAZY,mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    List<OrderShopGroup> orderShopGroups= new ArrayList<>();

    @OneToOne(fetch = FetchType.LAZY, mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    ShippingAddress shippingAddress;

    @Enumerated(EnumType.STRING)
    Payment payment;

    @Enumerated(EnumType.STRING)
    OrderStatus status;
}
