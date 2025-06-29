// src/services/auth.js

export const register = async (formData) => {
    console.log("Mock register", formData);
    return { success: true };
  };
  
  export const login = async (formData) => {
    console.log("Mock login", formData);
    return { success: true, token: "fake-token" };
  };
  