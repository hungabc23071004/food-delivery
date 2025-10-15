import axios from "axios";
import { NOTIFICATION_API } from "../constants/api";

export async function fetchNotifications(receiverId, page = 0, size = 10) {
  const token = localStorage.getItem("accessToken");
  const res = await axios.get(`${NOTIFICATION_API}/shop`, {
    params: { receiverId, page, size },
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  // Trả về đúng cấu trúc backend: { code, result: { content, ... } }
  return res.data;
}
