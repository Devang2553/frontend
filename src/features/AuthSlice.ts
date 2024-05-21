import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axiosInstance";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
}

interface Credentials {
  email: string;
  password: string;
}
interface UserData {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
}

interface AuthState {
  isLoggedIn: boolean;
  user: User | null;
  error: string | null;
}

const initialState: AuthState = {
  isLoggedIn: false,
  user: null,
  error: null,
};

const saveUserToLocalStorage = (user: User) => {
  localStorage.setItem("token", JSON.stringify(user));
};

const loadUserFromLocalStorage = (): User | null => {
  const userStr = localStorage.getItem("token");
  return userStr ? JSON.parse(userStr) : null;
};

export const loginAsync = createAsyncThunk(
  "auth/login",
  async (credentials: Credentials) => {
    const response = await axiosInstance.post("/login", credentials);
    console.log(response);
    return response.data as User; 
  }
);

export const registerAsync = createAsyncThunk(
  "auth/register",
  async (userData: UserData) => {
    const response = await axiosInstance.post("/register", userData);
    return response.data as User; 
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    ...initialState,
    user: loadUserFromLocalStorage(),
    isLoggedIn: !!loadUserFromLocalStorage(),
  } as AuthState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.fulfilled, (state, action: PayloadAction<User>) => {
        state.isLoggedIn = true;
        state.user = action.payload;
        state.error = null;
        saveUserToLocalStorage(action.payload);
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.isLoggedIn = false;
        state.user = null;
        state.error = action.error.message as string;
      })
      .addCase(
        registerAsync.fulfilled,
        (state, action: PayloadAction<User>) => {
          state.isLoggedIn = true;
          state.user = action.payload;
          state.error = null;
          saveUserToLocalStorage(action.payload);
        }
      )
      .addCase(registerAsync.rejected, (state, action) => {
        state.isLoggedIn = false;
        state.user = null;
        state.error = action.error.message as string;
      });
  },
});

export default authSlice.reducer;
