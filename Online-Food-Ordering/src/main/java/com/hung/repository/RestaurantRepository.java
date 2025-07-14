package com.hung.repository;

import com.hung.entity.Restaurant;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
@Repository
public interface RestaurantRepository extends JpaRepository<Restaurant, Long> {

    @EntityGraph(attributePaths = {"address", "images","owner"})
    Restaurant findByOwnerId(Long id);



    @Query("Select r from Restaurant r where  lower(r.name) like lower(concat('%',:query,'%'))" +
            " or lower(r.cuisineType) like lower(concat('%',:query,'%')) ")
    List<Restaurant> findBySearchQuery(String query);


    @EntityGraph(attributePaths = {"address", "images","owner"})
    Optional<Restaurant> findById(Long id);

    @EntityGraph(attributePaths = {"address", "images","owner"})
    List<Restaurant> findAll();
}
