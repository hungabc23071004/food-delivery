package com.hung.listener;

import com.hung.entity.CarItem;
import com.hung.entity.Cart;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;

public class CartListener {
    @PrePersist
    @PreUpdate
    public void calculateTotal(Cart cart) {
        Long total = 0L;
        if (cart.getItems() != null) {
            for (CarItem item : cart.getItems()) {
                total += item.getTotalPrice();
            }
        }
        cart.setTotal(total);
    }
}
