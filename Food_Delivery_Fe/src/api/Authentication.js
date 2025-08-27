// API Authentication functions
import { AUTH_API } from "../constants/api";
import axios from "axios";

export async function login(username, password) {
  const res = await axios.post(
    `${AUTH_API}/token`,
    { username, password },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return res.data;
}

export async function introspect(token) {
  const res = await axios.post(
    `${AUTH_API}/introspect`,
    { token },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
}

export async function refreshToken(refreshToken) {
  const res = await axios.post(
    `${AUTH_API}/refresh`,
    { refreshToken },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return res.data;
}

export async function logout(token) {
  const res = await axios.post(
    `${AUTH_API}/logout`,
    { token },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
}
