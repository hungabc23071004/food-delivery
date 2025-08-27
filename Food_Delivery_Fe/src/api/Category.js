import { CATEGORY_API } from "../constants/api";
import axios from "axios";

const getAuthHeader = () => {
  const token = localStorage.getItem("accessToken");
  return { Authorization: `Bearer ${token}` };
};

// Lấy tất cả category root
export const getAllCategoryRoot = async () => {
  const res = await axios.get(CATEGORY_API, {
    headers: getAuthHeader(),
  });
  return res.data;
};

// Lấy category theo parentId
export const getCategoryByParentId = async (parentId) => {
  const res = await axios.get(`${CATEGORY_API}/${parentId}`, {
    headers: getAuthHeader(),
  });
  return res.data;
};

// Tạo category mới (multipart/form-data)
export const createCategory = async (formData) => {
  const res = await axios.post(CATEGORY_API, formData, {
    headers: {
      ...getAuthHeader(),
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};
