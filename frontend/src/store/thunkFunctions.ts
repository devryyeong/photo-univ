import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axios";

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (body, thunkAPI) => {
    try {
      const response = await axiosInstance.post(
        `/users/register`, body
      )

      return response.data;
    } catch (error) {
      console.log("register error: ", error);
      return thunkAPI.rejectWithValue(error.response.data || error.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (body, thunKAPI) => {
    try {
      const response = await axiosInstance.post(
        `/users/login`, body
      )

      return response.data;
    } catch (error) {
      console.log("login error", error);
      return thunKAPI.rejectWithValue(error.response.data || error.message);
    }
  }
);
