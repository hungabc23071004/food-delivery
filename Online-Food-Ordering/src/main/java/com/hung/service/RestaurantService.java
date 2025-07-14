package com.hung.service;

import com.hung.Mapper.AddressMapper;
import com.hung.Mapper.ContactInformationMapper;
import com.hung.Mapper.RestaurantMapper;
import com.hung.Mapper.UserMapper;
import com.hung.dto.RestaurantDto;
import com.hung.dto.request.ContactInformationRequest;
import com.hung.dto.request.CreateRestaurantRequest;
import com.hung.dto.response.RestaurantResponse;
import com.hung.entity.Address;
import com.hung.entity.Restaurant;
import com.hung.entity.User;
import com.hung.exception.AppException;
import com.hung.exception.ErrorCode;
import com.hung.repository.AddressRepository;
import com.hung.repository.RestaurantRepository;
import com.hung.repository.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class RestaurantService {

    RestaurantRepository restaurantRepository;

    AddressRepository addressRepository;

    UserRepository userRepository;

    RestaurantMapper restaurantMapper;

    AddressMapper addressMapper;

    UserMapper userMapper;

    ContactInformationMapper contactInformationMapper;

    public RestaurantResponse createRestaurant(CreateRestaurantRequest request) {
        Address address= addressRepository.save(addressMapper.toAddress(request.getAddress()));
        String name = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByFullName(name).orElseThrow(()-> new AppException(ErrorCode.USER_NOT_EXISTED));
        Restaurant restaurant= restaurantMapper.toRestaurant(request);
        restaurant.setOwner(user);
        restaurant.setOpen(true);
        restaurant.setRegistrationDate(LocalDateTime.now());
        restaurantRepository.save(restaurant);
        return restaurantMapper.toRestaurantResponse(restaurant);
    }

    public void deleteRestaurant(Long restaurantId) {
        Restaurant restaurant = restaurantRepository.findById(restaurantId).orElseThrow(()-> new AppException(ErrorCode.RESTAURANT_NOT_EXISTED));
        restaurantRepository.delete(restaurant);
    }

    public RestaurantDto  addToFavorites (Long restaurantId) {
        Restaurant restaurant = restaurantRepository.findById(restaurantId).orElseThrow(()-> new AppException(ErrorCode.RESTAURANT_NOT_EXISTED));
        User user = userRepository.findByFullName(SecurityContextHolder.getContext().getAuthentication().getName())
                .orElseThrow(()-> new AppException(ErrorCode.USER_NOT_EXISTED));
        RestaurantDto restaurantDto = RestaurantDto.builder()
                .description(restaurant.getDescription())
                .title(restaurant.getName())
                .images(restaurant.getImages())
                .id(restaurant.getId())
                .build();

       boolean isFavorited =false;
       List<RestaurantDto> favorites = user.getFavorites();
       for(RestaurantDto restaurantDto1 : favorites) {
           if(restaurantDto1.getId().equals(restaurant.getId())) {
               isFavorited = true;
               break;
           }
       }
       if(isFavorited) {
           favorites.removeIf(restaurantDto1 -> restaurantDto1.getId().equals(restaurant.getId()));

       }
       else{
           favorites.add(restaurantDto);
       }
        userRepository.save(user);
        return restaurantDto;

    }

    public RestaurantResponse updateRestaurantStatus (Long id){
        Restaurant restaurant= restaurantRepository.findById(id).orElseThrow(()-> new AppException(ErrorCode.RESTAURANT_NOT_EXISTED));
        restaurant.setOpen(!restaurant.isOpen());
        restaurant.setRegistrationDate(LocalDateTime.now());
        restaurantRepository.save(restaurant);
        RestaurantResponse restaurantResponse = restaurantMapper.toRestaurantResponse(restaurant);
        return restaurantResponse;
    }

    public List<RestaurantResponse> getAllRestaurant(){
        List<Restaurant> restaurantList= restaurantRepository.findAll();
        ArrayList<RestaurantResponse> restaurantResponses= new ArrayList<>();
        for(Restaurant restaurant:restaurantList){
            restaurantResponses.add(restaurantMapper.toRestaurantResponse(restaurant));
        }
        return restaurantResponses;
    }

    public List<Restaurant> getRestaurants(String keyword){
        return restaurantRepository.findBySearchQuery(keyword);
    }

    public Restaurant getRestaurantByUserID(Long userID){
        Restaurant restaurant= restaurantRepository.findByOwnerId(userID);
        if(restaurant == null){
            throw new AppException(ErrorCode.RESTAURANT_NOT_EXISTED);
        }
        return restaurant;
    }

    public RestaurantResponse getRestaurantById(Long id){
        return restaurantMapper.toRestaurantResponse( restaurantRepository.findById(id).orElseThrow(()-> new AppException(ErrorCode.RESTAURANT_NOT_EXISTED)));
    }
}
