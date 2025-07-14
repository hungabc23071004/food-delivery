package com.hung.repository;

import com.hung.entity.CarItem;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CartItemRepository  extends JpaRepository<CarItem, Long> {
    @EntityGraph(attributePaths = {"food"})
    List<CarItem>findByCartId(Long cartId);

    @EntityGraph(attributePaths = {"ingredients","food","cart"})
    Optional<CarItem> findById(Long productId);


}
