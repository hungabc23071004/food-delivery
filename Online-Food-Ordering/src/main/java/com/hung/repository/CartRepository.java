package com.hung.repository;

import com.hung.entity.Cart;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository

public interface CartRepository extends JpaRepository<Cart, Long> {
        @EntityGraph(attributePaths = {"items"})
        Optional<Cart> findById(Long aLong);

        @EntityGraph(attributePaths = {"items","customer","items.food"})
        Cart findByCustomerId(Long customerId);
}
