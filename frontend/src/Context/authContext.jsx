import React, { createContext, useState, useContext } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(false);

  // Signup function
  const signup = async (credentials) => {
    setIsSigningUp(true);
    try {
      const response = await axios.post("/api/auth/signup", credentials);
      setUser(response.data.user);
      toast.success("Signup successfully");
    } catch (err) {
      toast.error(err.response?.data?.message || "Sign up failed");
    } finally {
      setIsSigningUp(false);
    }
  };

  // Login function
  const login = async (credentials) => {
    setIsLoggingIn(true);
    try {
      const response = await axios.post("/api/auth/login", credentials);
      setUser(response.data.user);
      toast.success("Login successfully");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setIsLoggingIn(false);
    }
  };

  // Logout function
  const logout = async () => {
    setIsLoggingOut(true);
    try {
      await axios.post("/api/auth/logout");
      setUser(null);
      toast.success("Logged out successfully");
    } catch (err) {
      toast.error(err.response?.data?.message || "Logout failed");
    } finally {
      setIsLoggingOut(false);
    }
  };

  // Check authentication
  const authCheck = async () => {
    setIsCheckingAuth(true);
    try {
      const response = await axios.get("/api/auth/authCheck", {
        withCredentials: true,
      });
      setUser(response.data.user);
    } catch (err) {
      console.error(err.message);
      setUser(null);
    } finally {
      setIsCheckingAuth(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isLoggingOut,
        isLoggingIn,
        isSigningUp,
        isCheckingAuth,
        signup,
        login,
        logout,
        authCheck,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use AuthContext
export const useAuth = () => useContext(AuthContext);
