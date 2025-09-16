package com.hung.entity;

import com.hung.enums.ShopStatus;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
public class Shop {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String id;

    @Column(nullable = false, length = 100)
    String name;

    String phoneNumber;

    @Column(length = 500)
    String description;

    String logo;
    String banner;

    @Column(nullable = false)
    LocalTime openingTime;

    @Column(nullable = false)
    LocalTime closingTime;

    @CreationTimestamp
    @Column(updatable = false)
    LocalDateTime createdAt;

    @Enumerated(EnumType.STRING)
    private ShopStatus status;

    @UpdateTimestamp
    LocalDateTime updatedAt;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false)
    User user;

    @OneToOne(fetch = FetchType.LAZY, mappedBy = "shop", cascade = CascadeType.ALL, orphanRemoval = true)
    ShopAddress shopAddress;

    @Builder.Default
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "shop", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ShopReview> shopReviews = new ArrayList<>();

    @Builder.Default
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "shop", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Food> foods = new ArrayList<>();

    @Builder.Default
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "shop", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderShopGroup> orderShopGroups = new ArrayList<>();

    @Builder.Default
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "shop", cascade = CascadeType.ALL, orphanRemoval = true)
    List<Coupon> coupons = new ArrayList<>();

    // 🔹 Many-to-Many với Category
    @ManyToMany
    @JoinTable(
            name = "shop_category_map",
            joinColumns = @JoinColumn(name = "shop_id"),
            inverseJoinColumns = @JoinColumn(name = "shop_category_id")
    )
    List<ShopCategory> categories = new ArrayList<>();
    @OneToMany(mappedBy = "shop")
    List<Category> categoryOfShop;
    public void setShopAddress(ShopAddress shopAddress) {
        this.shopAddress = shopAddress;
        if (shopAddress != null) {
            shopAddress.setShop(this); // ✅ set 2 chiều ở đây luôn
        }
    }

}
