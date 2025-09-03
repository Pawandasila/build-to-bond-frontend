import Cookies from "js-cookie";
import config from "./config";

const API_BASE_URL = config.apiBaseUrl;

const getAuthToken = (): string | null => {
  if (typeof window !== "undefined") {
    return Cookies.get("authToken") || null;
  }
  return null;
};

const createHeaders = (includeAuth: boolean = true): HeadersInit => {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (includeAuth) {
    const token = getAuthToken();
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  }

  return headers;
};

export const apiRequest = async <T = unknown>(
  endpoint: string,
  options: RequestInit = {},
  includeAuth: boolean = true
): Promise<T> => {
  const url = `${API_BASE_URL}${endpoint}`;

  const response = await fetch(url, {
    ...options,
    headers: {
      ...createHeaders(includeAuth),
      ...options.headers,
    },
  });

  if (!response.ok) {
    if (response.status === 401 && typeof window !== "undefined") {
      Cookies.remove("authToken");
      Cookies.remove("user");

      Cookies.remove("userId");
      if (window.location.pathname !== "/auth/login") {
        window.location.href = "/auth/login";
      }
    }

    let errorMessage = "An error occurred";
    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorData.error || errorMessage;
    } catch {
      errorMessage = response.statusText || errorMessage;
    }
    throw new Error(errorMessage);
  }

  return response.json();
};

export const authAPI = {
  login: (email: string, password: string) =>
    apiRequest(
      "/users/login",
      {
        method: "POST",
        body: JSON.stringify({ email, password }),
      },
      false
    ),

  signup: (
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    password: string
  ) =>
    apiRequest(
      "/users/register",
      {
        method: "POST",
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          phone,
          password,
        }),
      },
      false
    ),

  getCurrentUser: () =>
    apiRequest("/users/profile", {
      method: "GET",
    }),

  updateProfile: (data: Record<string, unknown>) =>
    apiRequest("/users/profile", {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  changePassword: (currentPassword: string, newPassword: string) =>
    apiRequest("/users/change-password", {
      method: "PUT",
      body: JSON.stringify({ currentPassword, newPassword }),
    }),

  updateLocation: (location: Record<string, unknown>) =>
    apiRequest("/users/location", {
      method: "PUT",
      body: JSON.stringify(location),
    }),

  deactivateAccount: () =>
    apiRequest("/users/deactivate", {
      method: "PUT",
    }),
};

const apiModule = { apiRequest };
export default apiModule;
