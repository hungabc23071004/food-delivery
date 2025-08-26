package com.hung.entity;


import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String id;

    @Column(name = "username", unique = true, columnDefinition = "VARCHAR(255) COLLATE utf8mb4_unicode_ci")
    String username;

    String password;
    LocalDate dob;
    String fullName;
    String email;
    String phone;
    boolean active;
    String avatarUrl;
    @Builder.Default
    @ManyToMany
    List<Role> roles= new ArrayList<>();

    @Builder.Default
    @ManyToMany(mappedBy = "users")
    List<Coupon> coupons= new ArrayList<>();

    @Builder.Default
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "user", cascade =CascadeType.ALL,orphanRemoval = true )
    List<ShopReview>  shopReviews= new ArrayList<>();

    @Builder.Default
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "user", cascade =CascadeType.ALL,orphanRemoval = true )
    List<Order> orders= new ArrayList<>();

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    Shop shop;

    @Builder.Default
    @OneToMany(fetch = FetchType.LAZY,mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    List<UserAddress> userAddresses= new ArrayList<>();

    @Builder.Default
    @OneToMany(fetch = FetchType.LAZY,mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<VerificationToken> verificationTokens= new ArrayList<>();
}
