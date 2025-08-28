// Đổi avatar người dùng (multipart/form-data)
export async function changeAvatar(formData) {
  const res = await axios.post(`${USER_API}/my-avatar`, formData, {
    headers: {
      ...getAuthHeader(),
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
}
import { USER_API } from "../constants/api";
import axios from "axios";

const getAuthHeader = () => {
  const token = localStorage.getItem("accessToken");
  return { Authorization: `Bearer ${token}` };
};

export async function activeUser(username, token) {
  const res = await axios.get(`${USER_API}/verification`, {
    params: { username, token },
  });
  return res.data;
}

export async function getUsers() {
  const res = await axios.get(`${USER_API}`);
  return res.data;
}

export async function getUser(userId) {
  const res = await axios.get(`${USER_API}/${userId}`);
  return res.data;
}

export async function updateUser(data) {
  const token = localStorage.getItem("accessToken");
  const res = await axios.put(`${USER_API}/my-info`, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
}

export async function createUser(data) {
  const res = await axios.post(`${USER_API}`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.data;
}

export async function deleteUser(userId) {
  const res = await axios.delete(`${USER_API}/${userId}`);
  return res.data;
}

export async function getMyInfo() {
  const res = await axios.get(`${USER_API}/my-info`, {
    headers: {
      ...getAuthHeader(),
    },
  });
  return res.data;
}
