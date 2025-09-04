import axios from "axios";
import { USER_ADDRESS_API } from "../constants/api";

const getAuthHeader = () => {
  const token = localStorage.getItem("accessToken");
  return { Authorization: `Bearer ${token}` };
};
// Lấy danh sách địa chỉ người dùng
export const getUserAddress = async () => {
  console.log({ USER_ADDRESS_API });
  return axios.get(USER_ADDRESS_API, {
    headers: getAuthHeader(),
  });
};

// Tạo mới địa chỉ người dùng
export const createUserAddress = async (data) => {
  return axios.post(USER_ADDRESS_API, data, { headers: getAuthHeader() });
};

// Xoá địa chỉ người dùng
export const deleteUserAddress = async (id) => {
  return axios.delete(`${USER_ADDRESS_API}/${id}`, {
    headers: getAuthHeader(),
  });
};

// Cập nhật địa chỉ người dùng
export const updateUserAddress = async (id, data) => {
  return axios.put(`${USER_ADDRESS_API}/${id}`, data, {
    headers: getAuthHeader(),
  });
};
