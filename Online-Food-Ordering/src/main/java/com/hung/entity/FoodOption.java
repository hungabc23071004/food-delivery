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
public class FoodOption {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String  id;

    private String optionName;  // "Size L", "Thêm trân châu"
    private BigDecimal extraPrice;
    @ManyToOne
    @JoinColumn(name = "option_group_id")
    private FoodOptionGroup optionGroup;

    @ManyToOne
    @JoinColumn(name= "cart_item_id")
    CartItem cartItem;
}
