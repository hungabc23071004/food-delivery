import { FOOD_API } from "../constants/api";
import axios from "axios";

export const getFoodByCategoryId = async (categoryId) => {
  const response = await axios.get(`${FOOD_API}/category/${categoryId}`);
  return response.data;
};

// Lấy tất cả món ăn của shop, có phân trang
export const getFoodByShopId = async (shopId, page = 1, size = 10) => {
  const response = await axios.get(`${FOOD_API}/shop/${shopId}`, {
    params: { page, size },
  });
  return response.data;
};

// Lấy chi tiết món ăn theo id
export const getFoodById = async (foodId) => {
  const response = await axios.get(`${FOOD_API}/${foodId}`);
  return response.data;
};

// Thêm món ăn mới
export const createFood = async (foodData) => {
  const response = await axios.post(`${FOOD_API}`, foodData);
  return response.data;
};

// Sửa món ăn
export const updateFood = async (foodId, foodData) => {
  const response = await axios.put(`${FOOD_API}/${foodId}`, foodData);
  return response.data;
};

// Xóa món ăn
export const deleteFood = async (foodId) => {
  const response = await axios.delete(`${FOOD_API}/${foodId}`);
  return response.data;
};
