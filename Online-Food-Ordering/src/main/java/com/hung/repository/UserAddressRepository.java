package com.hung.repository;

import com.hung.entity.UserAddress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserAddressRepository extends JpaRepository<UserAddress, String > {
    @Query("SELECT a FROM UserAddress a JOIN a.user b WHERE b.username = :username")
    List<UserAddress> findAllByUserName(@Param("username") String username);
}
