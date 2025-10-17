import { ORDER_API } from "../constants/api";
import axios from "axios";

const getAuthHeader = () => {
  const token = localStorage.getItem("accessToken");
  return { Authorization: `Bearer ${token}` };
};

// Tạo đơn hàng
export const createOrder = async (orderRequest) => {
  const res = await axios.post(ORDER_API, orderRequest, {
    headers: getAuthHeader(),
  });
  return res.data;
};

// Lấy danh sách đơn hàng của user
export const getOrdersByUserId = async (page = 1, size = 5) => {
  const res = await axios.get(ORDER_API, {
    headers: getAuthHeader(),
    params: { page, size },
  });
  return res.data;
};

export const getOrdersByShopId = async (shopId, page = 1, size = 5) => {
  const res = await axios.get(`${ORDER_API}/shop/${shopId}`, {
    headers: getAuthHeader(),
    params: { page, size },
  });
  return res.data;
};

// Cập nhật trạng thái đơn hàng
export const updateOrderStatus = async (orderStatusRequest) => {
  const res = await axios.patch(
    `${ORDER_API}/update/status`,
    orderStatusRequest,
    { headers: getAuthHeader() }
  );
  return res.data;
};

// Hủy đơn hàng
export const cancelOrder = async (id) => {
  const res = await axios.patch(
    `${ORDER_API}/cancel/${id}`,
    {},
    { headers: getAuthHeader() }
  );
  return res.data;
};

export const getDetailOrder = async (id) => {
  const res = await axios.get(`${ORDER_API}/${id}`, {
    headers: getAuthHeader(),
  });
  return res.data;
};
