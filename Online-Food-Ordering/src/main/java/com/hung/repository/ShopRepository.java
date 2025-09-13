package com.hung.repository;

import com.hung.entity.Shop;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ShopRepository extends JpaRepository<Shop, String > {
    List<Shop> findByCategories_Id(String categoryId);
}
