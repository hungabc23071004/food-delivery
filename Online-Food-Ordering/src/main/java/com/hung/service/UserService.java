package com.hung.service;

import com.hung.Mapper.UserMapper;
import com.hung.dto.request.UserCreateRequest;
import com.hung.dto.response.ApiResponse;
import com.hung.dto.response.UserResponse;
import com.hung.entity.Cart;
import com.hung.entity.User;
import com.hung.exception.AppException;
import com.hung.exception.ErrorCode;
import com.hung.repository.CartRepository;
import com.hung.repository.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class UserService {
    UserMapper userMapper;
    UserRepository userRepository;
    CartRepository cartRepository;
    PasswordEncoder passwordEncoder;

    public UserResponse creatAccount (UserCreateRequest request){
        User userCheck = userRepository.findByEmail(request.getEmail());
        if (userCheck != null) {
            throw new AppException(ErrorCode.EMAIL_EXISTED);
        }

        User user = userMapper.toUser(request);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        try{
            userRepository.save(user);
        }
        catch(DataIntegrityViolationException e){
            throw new AppException(ErrorCode.USER_EXISTED);
        }
        Cart cart = new Cart();
        cart.setCustomer(user);
        cartRepository.save( cart);
        return userMapper.toUserRespone(user);
    }



}
