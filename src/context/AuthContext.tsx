"use client";

import {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  useEffect,
} from "react";
import Cookies from "js-cookie";
import { authAPI } from "@/lib/api";

const COOKIE_OPTIONS = {
  expires: 7,
  path: "/",
  secure: false,
  sameSite: "lax" as const,
};

const setAuthData = (user: User, token: string) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("authToken", token);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("userId", user._id);
  }

  Cookies.set("authToken", token, COOKIE_OPTIONS);
  Cookies.set("user", JSON.stringify(user), COOKIE_OPTIONS);
  Cookies.set("userId", user._id, COOKIE_OPTIONS);
};

const getAuthData = () => {
  if (typeof window === "undefined") return { token: null, user: null };

  const token = localStorage.getItem("authToken");
  const userStr = localStorage.getItem("user");

  let user = null;
  if (userStr) {
    try {
      user = JSON.parse(userStr);
    } catch (error) {
      console.error("Error parsing user data:", error);
      clearAuthData();
      return { token: null, user: null };
    }
  }

  return { token, user };
};

const clearAuthData = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    localStorage.removeItem("userId");
  }

  Cookies.remove("authToken", { path: "/" });
  Cookies.remove("user", { path: "/" });
  Cookies.remove("userId", { path: "/" });
};

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  dob?: string;
  gender?: "male" | "female" | "other";
  bio?: string;
  interests?: string[];
  profilePicture?: string;
  avatar?: string;
  location?: {
    address?: string;
    city?: string;
    country?: string;
  };
  agePreferences?: {
    min?: number;
    max?: number;
  };
  socialLinks?: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
    linkedin?: string;
  };
  privacy?: "public" | "private";
  lookingFor?: "friendship" | "relationship" | "casual" | "other";
  height?: number;
  occupation?: string;
  education?: "high_school" | "bachelor" | "master" | "phd" | "other";
  smoking?: "never" | "sometimes" | "regularly" | "prefer_not_to_say";
  drinking?: "never" | "socially" | "regularly" | "prefer_not_to_say";
  relationshipStatus?: "single" | "divorced" | "widowed";
  children?: "none" | "have_children" | "want_children" | "dont_want_children";
  religion?: string;
  languages?: string[];
  subscription?: "free" | "solara";
  isActive?: boolean;
  profileCompleteness?: number;
  createdAt?: string;
  lastActive?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

type AuthAction =
  | { type: "LOGIN_START" }
  | { type: "LOGIN_SUCCESS"; payload: User }
  | { type: "LOGIN_FAILURE"; payload: string }
  | { type: "LOGOUT" }
  | { type: "UPDATE_PROFILE"; payload: Partial<User> }
  | { type: "CLEAR_ERROR" }
  | { type: "INIT_COMPLETE" };

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: true,
  error: null,
};

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "LOGIN_START":
      return { ...state, loading: true, error: null };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        loading: false,
        error: null,
      };
    case "LOGIN_FAILURE":
      return { ...state, loading: false, error: action.payload };
    case "LOGOUT":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        error: null,
        loading: false,
      };
    case "UPDATE_PROFILE":
      return {
        ...state,
        user: state.user ? { ...state.user, ...action.payload } : null,
      };
    case "CLEAR_ERROR":
      return { ...state, error: null };
    case "INIT_COMPLETE":
      return { ...state, loading: false };
    default:
      return state;
  }
};

interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    user: {
      _id: string;
      firstName: string;
      lastName: string;
      email: string;
      phone?: string;
      dob?: string;
      gender?: string;
      bio?: string;
      interests?: string[];
      profilePicture?: string;
      avatar?: string;
      location?: {
        city?: string;
        country?: string;
        coordinates?: number[];
      };
      agePreferences?: {
        min?: number;
        max?: number;
      };
      socialLinks?: {
        instagram?: string;
        twitter?: string;
        linkedin?: string;
      };
      privacy?: string;
      lookingFor?: string;
      height?: number;
      occupation?: string;
      education?: string;
      smoking?: string;
      drinking?: string;
      relationshipStatus?: string;
      children?: string;
      religion?: string;
      languages?: string[];
      subscription?: string;
      isActive?: boolean;
      profileCompleteness?: number;
      createdAt?: string;
      lastActive?: string;
    };
    accessToken: string;
    expiresAt: string;
    profileCompleteness: number;
  };
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  signup: (
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    password: string
  ) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const { token, user } = getAuthData();

    if (token && user && user._id) {
      dispatch({ type: "LOGIN_SUCCESS", payload: user });
    } else {
      dispatch({ type: "LOGOUT" });
    }

    dispatch({ type: "INIT_COMPLETE" });
  }, []);

  const login = async (email: string, password: string) => {
    dispatch({ type: "LOGIN_START" });
    try {
      const response = await authAPI.login(email, password) as LoginResponse;

      const userData = response.data.user;
      const token = response.data.accessToken;

      const user: User = {
        _id: userData._id,
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        phone: userData.phone,
        dob: userData.dob,
        gender: userData.gender as "male" | "female" | "other" | undefined,
        bio: userData.bio,
        interests: userData.interests,
        profilePicture: userData.profilePicture,
        avatar: userData.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
        location: userData.location,
        agePreferences: userData.agePreferences,
        socialLinks: userData.socialLinks,
        privacy: userData.privacy as "public" | "private" | undefined,
        lookingFor: userData.lookingFor as "friendship" | "relationship" | "casual" | "other" | undefined,
        height: userData.height,
        occupation: userData.occupation,
        education: userData.education as "high_school" | "bachelor" | "master" | "phd" | "other" | undefined,
        smoking: userData.smoking as "never" | "sometimes" | "regularly" | "prefer_not_to_say" | undefined,
        drinking: userData.drinking as "never" | "socially" | "regularly" | "prefer_not_to_say" | undefined,
        relationshipStatus: userData.relationshipStatus as "single" | "divorced" | "widowed" | undefined,
        children: userData.children as "none" | "have_children" | "want_children" | "dont_want_children" | undefined,
        religion: userData.religion,
        languages: userData.languages,
        subscription: userData.subscription as "free" | "solara" | undefined,
        isActive: userData.isActive,
        profileCompleteness: userData.profileCompleteness,
        createdAt: userData.createdAt,
        lastActive: userData.lastActive,
      };

      if (token) {
        setAuthData(user, token);
      }

      dispatch({ type: "LOGIN_SUCCESS", payload: user });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Login failed";
      dispatch({ type: "LOGIN_FAILURE", payload: errorMessage });
      throw error;
    }
  };

  const signup = async (
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    password: string
  ) => {
    dispatch({ type: "LOGIN_START" });
    try {
      await authAPI.signup(firstName, lastName, email, phone, password);
      dispatch({ type: "CLEAR_ERROR" });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Signup failed";
      dispatch({ type: "LOGIN_FAILURE", payload: errorMessage });
      throw error;
    }
  };

  const logout = () => {
    clearAuthData();
    dispatch({ type: "LOGOUT" });
  };

  const updateProfile = (data: Partial<User>) => {
    dispatch({ type: "UPDATE_PROFILE", payload: data });
  };

  const clearError = () => {
    dispatch({ type: "CLEAR_ERROR" });
  };

  const value: AuthContextType = {
    ...state,
    login,
    signup,
    logout,
    updateProfile,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};