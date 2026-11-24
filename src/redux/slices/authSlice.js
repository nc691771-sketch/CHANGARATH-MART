import { createSlice } from "@reduxjs/toolkit";

const savedUser = localStorage.getItem("user");

const authSlice = createSlice({
  name: "auth",

  initialState: {
    user: savedUser ? JSON.parse(savedUser) : null,
    isLoggedIn: savedUser ? true : false,
  },

  reducers: {
    loginUser: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;

      localStorage.setItem(
        "user",
        JSON.stringify(action.payload)
      );
    },

    logoutUser: (state) => {
      state.user = null;
      state.isLoggedIn = false;

      localStorage.removeItem("user");
    },
  },
});

export const { loginUser, logoutUser } = authSlice.actions;

export default authSlice.reducer;