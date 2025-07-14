package com.hung.repository;

import com.hung.entity.Orders;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<Orders, Long> {
        @EntityGraph(attributePaths ={"items","deliveryAddress","items.food"})
        List<Orders> findByCustomerId(Long customerId);

        @EntityGraph(attributePaths ={"items","deliveryAddress","items.food"})
        List<Orders> findByRestaurantId(Long restaurantId);

        @EntityGraph(attributePaths ={"items"})
        Optional<Orders> findById(Long orderId);
}
