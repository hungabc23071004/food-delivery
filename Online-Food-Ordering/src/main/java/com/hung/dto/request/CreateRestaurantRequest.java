package com.hung.dto.request;

import com.hung.entity.Address;
import com.hung.entity.ContactInformation;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CreateRestaurantRequest {
    Long id;
    String name;
    String description;
    String cuisineType;
    AddressRequest address;
    ContactInformationRequest contactInformation;
    String openingHours;
    List<String > images;
}
