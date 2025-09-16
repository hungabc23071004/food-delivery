import { CATEGORY_OF_SHOP_API } from "../constants/api";
import axios from "axios";
export const getCategoryOfShopByShopId = async (shopId) => {
  const res = await axios.get(`${CATEGORY_OF_SHOP_API}/shop/${shopId}`);
  return res.data;
};
