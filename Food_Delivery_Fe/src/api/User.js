// Kích hoạt người dùng đúng API backend
export async function activeUser(username, token) {
  const response = await fetch(
    `${USER_API}/verification?username=${encodeURIComponent(
      username
    )}&token=${encodeURIComponent(token)}`
  );
  return response.json();
}
import { USER_API } from "../constants/api";

export async function getUsers() {
  const response = await fetch(`${USER_API}`);
  return response.json();
}

export async function getUser(userId) {
  const response = await fetch(`${USER_API}/${userId}`);
  return response.json();
}

export async function updateUser(data) {
  const token = localStorage.getItem("accessToken");
  const response = await fetch(`${USER_API}/my-info`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

export async function createUser(data) {
  const response = await fetch(`${USER_API}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

export async function deleteUser(userId) {
  const response = await fetch(`${USER_API}/${userId}`, {
    method: "DELETE",
  });
  return response.json();
}

export async function getMyInfo() {
  const response = await fetch(`${USER_API}/my-info`);
  return response.json();
}
