package com.hung.service;

import com.hung.dto.request.ShopCategoryRequest;
import com.hung.dto.response.ShopCategoryResponse;
import com.hung.entity.ShopCategory;
import com.hung.exception.AppException;
import com.hung.exception.ErrorCode;
import com.hung.mapper.ShopMapper;
import com.hung.repository.ShopCategoryRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ShopCategoryService {
      ShopCategoryRepository shopCategoryRepository;
      ShopMapper shopMapper;
    private static final Path CURRENT_FOLDER = Paths.get(System.getProperty("user.dir"));


    public ShopCategoryResponse createShopCategory(ShopCategoryRequest shopCategoryRequest) throws IOException {
        Path staticPath = Paths.get("uploads");
        Path imagePath = Paths.get("images");
        Path imagesDir = CURRENT_FOLDER.resolve(staticPath).resolve(imagePath);
        if(!Files.exists(imagesDir)){
            Files.createDirectories(imagesDir);
        }
        Path file = imagesDir.resolve(shopCategoryRequest.getLogoUrl().getOriginalFilename());
        try(OutputStream os =Files.newOutputStream(file)){
            os.write(shopCategoryRequest.getLogoUrl().getBytes());
        }

        ShopCategory shopCategory = shopMapper.toShopCategory(shopCategoryRequest);
        if(shopCategoryRequest.getCategoryId()!=null && !shopCategoryRequest.getCategoryId().equals("")){
            ShopCategory shopCategoryMain = shopCategoryRepository.findById(shopCategoryRequest.getCategoryId()).orElseThrow(()-> new AppException(ErrorCode.SHOP_CATEGORY_NOT_EXISTED));
            shopCategory.setParent(shopCategoryMain);
        }
        shopCategory.setLogoUrl(shopCategoryRequest.getLogoUrl().getOriginalFilename().toString());
         return shopMapper.toShopCategoryResponse(shopCategoryRepository.save(shopCategory));

      }


      public List<ShopCategoryResponse> getAllShopCategoriesRoot(){
            return shopMapper.toShopCategoryResponseList(shopCategoryRepository.findByParentIdIsNull());
      }

      public List<ShopCategoryResponse>  getShopCategoriesByParentId(String parentId){
            return shopMapper.toShopCategoryResponseList(shopCategoryRepository.findByParentId(parentId));
      }

}
