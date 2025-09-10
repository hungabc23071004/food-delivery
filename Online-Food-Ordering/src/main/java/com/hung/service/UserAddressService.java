package com.hung.service;

import com.hung.dto.request.UserAddressRequest;
import com.hung.dto.response.UserAddressResponse;
import com.hung.entity.UserAddress;
import com.hung.exception.AppException;
import com.hung.exception.ErrorCode;
import com.hung.mapper.UserAddressMapper;
import com.hung.repository.UserAddressRepository;
import com.hung.repository.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class UserAddressService {
    UserAddressRepository userAddressRepository;
    UserAddressMapper userAddressMapper;
    UserRepository userRepository;


    public UserAddressResponse createUserAddress(UserAddressRequest userAddressRequest) {
        UserAddress userAddress = userAddressMapper.toUserAddress(userAddressRequest);
        if(userAddressRequest.isDefaultAddress()){
            List<UserAddress> userAddressList = userAddressRepository.findAllByUserName(SecurityContextHolder.getContext().getAuthentication().getName());
            for(UserAddress userAddressItem : userAddressList){
                userAddressItem.setDefaultAddress(false);
                userAddressRepository.save(userAddressItem);
            }

        }
        userAddress.setUser(userRepository.findByUsernameAndActive(SecurityContextHolder.getContext().getAuthentication().getName(),true).orElseThrow(()-> new AppException(ErrorCode.USER_NOT_EXISTED)));
        return userAddressMapper.toUserAddressResponse(userAddressRepository.save(userAddress));
    }

    public List<UserAddressResponse> getAllUserAddresses() {
        List<UserAddress> userAddressList = userAddressRepository.findAllByUserName(SecurityContextHolder.getContext().getAuthentication().getName());
        return  userAddressMapper.toUserAddressResponseList(userAddressList);
    }

    public void deleteUserAddress(String id ) {
        UserAddress userAddress = userAddressRepository.findById(id).orElseThrow(()-> new AppException(ErrorCode.USER_ADDRESS_NOT_EXISTED));
        if(userAddress.isDefaultAddress()){
            throw  new AppException(ErrorCode.DO_NOT_DELETE_USER_ADDRESS);
        }
        userAddressRepository.delete(userAddress);
    }

    public UserAddressResponse updateUserAddress(String id, UserAddressRequest userAddressRequest) {
        UserAddress userAddress = userAddressRepository.findById(id).orElseThrow(()-> new AppException(ErrorCode.USER_ADDRESS_NOT_EXISTED));
        userAddressMapper.toUserAddress(userAddress,userAddressRequest);
        if(userAddressRequest.isDefaultAddress()){
            List<UserAddress> userAddressList = userAddressRepository.findAllByUserName(SecurityContextHolder.getContext().getAuthentication().getName());
            for(UserAddress userAddressItem : userAddressList){
                if(userAddressItem.getId().equals(userAddress.getId())){continue;}
                userAddressItem.setDefaultAddress(false);
                userAddressRepository.save(userAddressItem);
            }
        }
        return userAddressMapper.toUserAddressResponse(userAddressRepository.save(userAddress));
    }

    public UserAddressResponse getUserAddressDetail(String id){
        return userAddressMapper.toUserAddressResponse(userAddressRepository.findById(id).orElseThrow(()-> new AppException(ErrorCode.USER_ADDRESS_NOT_EXISTED)));
    }

    

}
