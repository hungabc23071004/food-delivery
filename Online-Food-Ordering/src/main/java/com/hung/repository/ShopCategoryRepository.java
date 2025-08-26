package com.hung.repository;

import com.hung.entity.ShopCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ShopCategoryRepository extends JpaRepository<ShopCategory, String> {
    List<ShopCategory> findByParentIdIsNull();


    List<ShopCategory> findByParentId(String  parentId);

}
