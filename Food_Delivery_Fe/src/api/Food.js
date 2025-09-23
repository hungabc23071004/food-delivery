import { FOOD_API } from "../constants/api";
import axios from "axios";

export const getFoodByCategoryId = async (categoryId) => {
  const response = await axios.get(`${FOOD_API}/category/${categoryId}`);
  return response.data;
};
