import axios from "axios";
import { CART_API } from "../constants/api";

const getAuthHeader = () => {
  const token = localStorage.getItem("accessToken");
  return { Authorization: `Bearer ${token}` };
};

// Lấy giỏ hàng hiện tại
export const getCart = () => {
  return axios.get(CART_API, { headers: getAuthHeader() });
};

// Thêm sản phẩm vào giỏ hàng
export const addCartItem = (cartItemRequest) => {
  return axios.post(CART_API, cartItemRequest, { headers: getAuthHeader() });
};

// Xóa toàn bộ sản phẩm trong giỏ hàng (clear cart)
export const clearCartItem = (id) => {
  return axios.put(`${CART_API}/${id}/clear`, {}, { headers: getAuthHeader() });
};

// Cập nhật sản phẩm trong giỏ hàng
export const updateCartItem = (id, cartItemRequest) => {
  return axios.patch(`${CART_API}/${id}/update`, cartItemRequest, {
    headers: getAuthHeader(),
  });
};
