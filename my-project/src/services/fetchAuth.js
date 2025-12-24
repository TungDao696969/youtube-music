// FETCH WITH AUTH  dùng chung
import { refreshToken } from "./api";
import { navigate } from "../routers/router";

const getAccessToken = () => localStorage.getItem("access_token");
const clearAuth = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("user");
};

let refreshingPromise = null;
let isLoggingOut = false;
export const fetchAuth = async (url, options = {}) => {
  let token = getAccessToken();

  const initHeaders = { ...(options.headers || {}) };
  if (token) initHeaders.Authorization = `Bearer ${token}`;

  let res = await fetch(url, {
    ...options,
    headers: initHeaders,
  });

  if (res.status !== 401) return res;

  console.log("[FetchAuth] Got 401, attempting token refresh...");

  if (!refreshingPromise) {
    refreshingPromise = refreshToken();
  }

  const newToken = await refreshingPromise;
  refreshingPromise = null;

  if (!newToken) {
    console.error("[FetchAuth] Token refresh failed");
    if (!isLoggingOut) {
      isLoggingOut = true;
      clearAuth();
      navigate("/auth");
    }
    throw new Error("Phiên đăng nhập hết hạn");
  }

    localStorage.setItem("access_token", newToken);

  console.log("[FetchAuth] Retrying request with new token");
  const retryHeaders = { ...(options.headers || {}) };
  retryHeaders.Authorization = `Bearer ${newToken}`;

  return fetch(url, {
    ...options,
    headers: retryHeaders,
  });
};
