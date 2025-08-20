package com.hung.repository;

import com.hung.entity.ShopCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ShopCategoryRepository  extends JpaRepository<ShopCategory, String> {
}
