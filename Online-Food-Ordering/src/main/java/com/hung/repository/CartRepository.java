package com.hung.repository;

import com.hung.entity.Cart;
import com.hung.enums.CartStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CartRepository extends JpaRepository<Cart, String > {
    Cart findByUserIdAndStatus(String userid, CartStatus status);

    @Query("SELECT c FROM Cart c " +
            "LEFT JOIN FETCH c.cartItems ci " +
            "LEFT JOIN FETCH ci.food f " +
            "LEFT JOIN FETCH f.images " +
            "WHERE c.id = :id")
    Optional<Cart> findByIdWithItems(@Param("id") String id);
}


