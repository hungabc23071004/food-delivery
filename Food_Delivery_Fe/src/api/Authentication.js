// API Authentication functions
import { AUTH_API } from "../constants/api";

export async function login(username, password) {
  const response = await fetch(`${AUTH_API}/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });
  if (!response.ok) {
    throw new Error("Đăng nhập thất bại");
  }
  return response.json();
}

export async function introspect(token) {
  const response = await fetch(`${AUTH_API}/introspect`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ token }),
  });
  return response.json();
}

export async function refreshToken(refreshToken) {
  const response = await fetch(`${AUTH_API}/refresh`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refreshToken }),
  });
  return response.json();
}

export async function logout(token) {
  const response = await fetch(`${AUTH_API}/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ token }),
  });
  return response.json();
}
