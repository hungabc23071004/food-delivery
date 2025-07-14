package com.hung.dto.response;

import com.hung.entity.Address;
import com.hung.entity.ContactInformation;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class RestaurantResponse {
    Long id;
    String name;
    String description;
    String cuisineType;
    AddressResponse address;
    ContactInformationResponse contactInformation;
    String openingHours;
    List<String > images;
    UserResponse owner;
    Boolean open;
}
