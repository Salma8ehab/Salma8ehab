// src/utils/authStorage.ts
import { Tokens } from "@/types/auth";
const ACCESS_KEY = "access_token";
const REFRESH_KEY = "refresh_token";
export function setAuthTokens({ access_token, refresh_token }: Tokens) {
  localStorage.setItem(ACCESS_KEY, access_token);
  localStorage.setItem(REFRESH_KEY, refresh_token);
}
export function clearAuthTokens() {
  localStorage.removeItem(ACCESS_KEY);
  localStorage.removeItem(REFRESH_KEY);
}
export function getAuthTokens(): Tokens {
  return {
    access_token: localStorage.getItem(ACCESS_KEY) ?? "",
    refresh_token: localStorage.getItem(REFRESH_KEY) ?? "",
  };
}
export function logout(redirect = "/login") {
  clearAuthTokens();
  window.location.replace(redirect);
}
