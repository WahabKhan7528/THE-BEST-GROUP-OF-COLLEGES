import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authApi } from "../../services/api";
import { clearAccessToken } from "../../services/http";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ loginId, password, allowedRoles = [] }, { rejectWithValue }) => {
    try {
      const normalizedLoginId =
        typeof loginId === "string" ? loginId.trim() : loginId;
      const { data } = await authApi.login({
        id: normalizedLoginId,
        password,
      });
      const user = data.user;

      if (
        Array.isArray(allowedRoles) &&
        allowedRoles.length > 0 &&
        !allowedRoles.includes(user?.role)
      ) {
        return rejectWithValue({
          message: `This portal does not accept ${user?.role || "this"} accounts.`,
          status: 403,
        });
      }

      return user;
    } catch (error) {
      clearAccessToken();
      return rejectWithValue({
        message: error.response?.data?.message || "Login failed",
        status: error.response?.status || null,
      });
    }
  },
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      await authApi.logout();
      clearAccessToken();
      return null;
    } catch (error) {
      clearAccessToken();
      return rejectWithValue(error.response?.data?.message || "Logout failed");
    }
  },
);

export const fetchUser = createAsyncThunk(
  "auth/fetchUser",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await authApi.me();
      return data.user;
    } catch (error) {
      return rejectWithValue(null);
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: true,
    error: null,
    isAuthenticated: false,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearAuthState: (state) => {
      state.user = null;
      state.loading = false;
      state.error = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || action.payload;
      })
      // Logout
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch user
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = !!action.payload;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
      });
  },
});

export const { clearError, clearAuthState } = authSlice.actions;
export default authSlice.reducer;
