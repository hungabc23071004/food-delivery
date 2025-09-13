package com.hung.repository;

import com.hung.entity.Food;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FoodRepository extends JpaRepository<Food, String> {
    List<Food> findByCategory_Id(String id);
}
