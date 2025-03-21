"use client";
import React, { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";

// Firebase App (replace this with your own)
import { auth, googleProvider } from "../Component/Auth/FirebaseAuth";
import { toast } from "react-toastify";
import { useAxiospublic } from "../hooks/useAxiospublic";

export const AppContext = createContext();

const ContextProvider = ({ children }) => {
  // axios public import
  const axiosPublic = useAxiospublic();
  // api url
  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  // user State
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = JSON.parse(localStorage.getItem("user")) || null;
      setUser(storedUser);
    }
  }, []);

  // logout user
  const [isLoading, setIsLoading] = useState(true);

  // singup or Register user
  const RegisterUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  // sinIn or login user
  const loginUser = (email, password) => {
    setIsLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Google login
  const loginWithGoogle = () => {
    setIsLoading(true);
    return signInWithPopup(auth, googleProvider);
  };
  // updateUser
  const updateUser = (updatedInfo) => {
    setUser((prevUser) => ({
      ...prevUser,
      ...updatedInfo,
    }));
  };

  const updateProfileData = async (updatedInfo) => {
    if (auth.currentUser) {
      try {
        await updateProfile(auth.currentUser, {
          displayName: updatedInfo.name,
          email: updatedInfo.email,
          photoURL: updatedInfo.photoURL,
        });

        const response = await axiosPublic.put(
          "/api/update-profile",
          updatedInfo
        );
        if (response.status === 200) {
          const updatedUser = response.data;
          setUser((prev) => {
            const newUser = {
              ...prev,
              displayName: updatedUser.displayName,
              photoURL: updatedUser.photoURL,
              email: updatedUser.email,
            };
            window.localStorage.setItem("user", JSON.stringify(newUser)); // ✅ Update local storage
            return newUser;
          });
          toast.success("Profile updated successfully!");
        } else {
          toast.error("Failed to update profile.");
        }
      } catch (error) {
        toast.error("Failed to update profile.");
      }
    }
  };

  // Logout User
  const logoutUser = async () => {
    window.localStorage.removeItem("user");
    window.localStorage.removeItem("access-token");
    setUser(null);
    return await signOut(auth);
  };

  // any change user Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const loggedInUser = {
          uid: currentUser.uid,
          displayName: currentUser.displayName,
          email: currentUser.email,
          photoURL: currentUser.photoURL,
        };

        try {
          const res = await axiosPublic.post("/api/jwt", loggedInUser);
          if (res.data.success) {
            window.localStorage.setItem("access-token", res.data.token);
          }
        } catch (error) {
          console.error("JWT error:", error);
        }

        setUser(loggedInUser);
        window.localStorage.setItem("user", JSON.stringify(loggedInUser));
      } else {
        setUser(null);
        window.localStorage.removeItem("user");
        window.localStorage.removeItem("access-token");
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const contextApiValue = {
    apiUrl,
    user,
    setUser,
    RegisterUser,
    loginUser,
    loginWithGoogle,
    logoutUser,
    updateUser,
    updateProfileData,
    isLoading,
  };

  return (
    <AppContext.Provider value={contextApiValue}>
      {children}
    </AppContext.Provider>
  );
};

export default ContextProvider;
