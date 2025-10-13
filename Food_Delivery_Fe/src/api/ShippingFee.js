import axios from "axios";
import { SHIP_API } from "../constants/api";
const getAuthHeader = () => {
  const token = localStorage.getItem("accessToken");
  return { Authorization: `Bearer ${token}` };
};
// Tính phí vận chuyển
export const createShippingFee = async (data) => {
  // data: ShippingFeeRequest
  const res = await axios.post(`${SHIP_API}/fee`, data);
  return res.data;
};
