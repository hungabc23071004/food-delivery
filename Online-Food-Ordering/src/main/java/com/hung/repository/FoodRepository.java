package com.hung.repository;

import com.hung.entity.Food;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FoodRepository extends JpaRepository<Food, Long> {
    @EntityGraph(attributePaths = {"ingredients", "images"})

    List<Food> findByRestaurantId(Long restaurantId);

    @EntityGraph(attributePaths = {"ingredients", "images"})
    Optional<Food> findById(Long id);

    @Query("Select f from Food f where f.name LIKE %:keyword% or f.foodCategory.name like %:keyword%")
    List<Food > searchFood(@Param("keyword") String keyword);
}
