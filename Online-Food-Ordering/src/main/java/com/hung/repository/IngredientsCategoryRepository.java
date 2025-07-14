package com.hung.repository;


import com.hung.entity.IngredientCategory;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IngredientsCategoryRepository extends JpaRepository<IngredientCategory,Long> {
    @EntityGraph(attributePaths = {"ingredients"})
    List<IngredientCategory> findByRestaurantId(Long restaurantId);

    @EntityGraph(attributePaths = {"ingredients"})
    IngredientCategory findById (long id);

    @EntityGraph(attributePaths = {"ingredients"})
    IngredientCategory findWithIngredientsById(long id);
}
