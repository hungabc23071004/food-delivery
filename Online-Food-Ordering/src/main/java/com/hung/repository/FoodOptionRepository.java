package com.hung.repository;

import com.hung.entity.FoodOption;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FoodOptionRepository extends JpaRepository<FoodOption, String > {
    List<FoodOption > findAllByIdIn(List<String> idn);
}
