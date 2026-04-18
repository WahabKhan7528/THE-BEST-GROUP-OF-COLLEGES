import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { adminApi } from "../../services/api";

export const fetchAdminUsers = createAsyncThunk(
  "admin/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await adminApi.users();
      return data.data || [];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const fetchAdminCourses = createAsyncThunk(
  "admin/fetchCourses",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await adminApi.courses();
      return data.data || [];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const fetchAdminClasses = createAsyncThunk(
  "admin/fetchClasses",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await adminApi.classes();
      return data.data || [];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const fetchAdminSubjects = createAsyncThunk(
  "admin/fetchSubjects",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await adminApi.subjects();
      return data.data || [];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const fetchAdminCampuses = createAsyncThunk(
  "admin/fetchCampuses",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await adminApi.campuses();
      return data.data || [];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    users: [],
    courses: [],
    classes: [],
    subjects: [],
    campuses: [],
    selectedCampusFilter: "all",
    loading: false,
    error: null,
  },
  reducers: {
    setSelectedCampusFilter: (state, action) => {
      state.selectedCampusFilter = action.payload;
    },
    addCampus: (state, action) => {
      state.campuses.push(action.payload);
    },
    updateCampus: (state, action) => {
      const index = state.campuses.findIndex(
        (c) => c._id === action.payload._id,
      );
      if (index !== -1) {
        state.campuses[index] = action.payload;
      }
    },
    deleteCampus: (state, action) => {
      state.campuses = state.campuses.filter((c) => c._id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchAdminUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchAdminCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = action.payload;
      })
      .addCase(fetchAdminCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchAdminClasses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminClasses.fulfilled, (state, action) => {
        state.loading = false;
        state.classes = action.payload;
      })
      .addCase(fetchAdminClasses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchAdminSubjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminSubjects.fulfilled, (state, action) => {
        state.loading = false;
        state.subjects = action.payload;
      })
      .addCase(fetchAdminSubjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchAdminCampuses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminCampuses.fulfilled, (state, action) => {
        state.loading = false;
        state.campuses = action.payload;
      })
      .addCase(fetchAdminCampuses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  setSelectedCampusFilter,
  addCampus,
  updateCampus,
  deleteCampus,
} = adminSlice.actions;
export default adminSlice.reducer;
