import axios from "axios";
import { SHOP_API } from "../constants/api";

const getAuthHeader = () => {
  const token = localStorage.getItem("accessToken");
  return { Authorization: `Bearer ${token}` };
};

// Lay danh sach cac shop
export const getAllShop = async () => {
  const res = await axios.get(SHOP_API);
  return res.data;
};

//Lay chi tiet shop theo id
export const getShopById = async (id) => {
  const res = await axios.get(`${SHOP_API}/${id}`);
  return res.data;
};

export const getMyShop = async () => {
  const res = await axios.get(`${SHOP_API}/my_shop`, {
    headers: getAuthHeader(),
  });
  return res.data;
};

// Lay danh sach category cua shop
export const getAllShopCategory = async () => {
  const res = await axios.get(`${SHOP_API}/category`, {
    headers: getAuthHeader(),
  });
  return res.data;
};
