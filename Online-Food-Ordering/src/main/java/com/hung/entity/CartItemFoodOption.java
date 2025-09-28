package com.hung.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CartItemFoodOption {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @EqualsAndHashCode.Include

    String  id;

    String optionName;  // "Size L", "Thêm trân châu"
    Double extraPrice;

    @ManyToOne
    @JoinColumn(name= "cart_item_id")
    CartItem cartItem;

    @ManyToOne
    @JoinColumn(name = "food_option_id")   // thêm quan hệ với FoodOption
    private FoodOption foodOption;
}
