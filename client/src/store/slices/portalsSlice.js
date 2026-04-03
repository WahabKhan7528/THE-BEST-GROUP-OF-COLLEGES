import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { portalApi } from '../../services/api';

export const fetchPortalData = createAsyncThunk(
  'portal/fetchData',
  async (_, { rejectWithValue }) => {
    try {
      const [classRes, announcementRes, assignmentRes, materialRes, resultRes, submissionRes] = await Promise.all([
        portalApi.classes(),
        portalApi.announcements(),
        portalApi.assignments(),
        portalApi.materials(),
        portalApi.results(),
        portalApi.mySubmissions(),
      ]);
      return {
        classes: classRes.data.data || [],
        announcements: announcementRes.data.data || [],
        assignments: assignmentRes.data.data || [],
        materials: materialRes.data.data || [],
        results: resultRes.data.data || [],
        submissions: submissionRes.data.data || [],
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const portalsSlice = createSlice({
  name: 'portals',
  initialState: {
    classes: [],
    announcements: [],
    assignments: [],
    materials: [],
    submissions: [],
    results: [],
    loading: false,
    error: null,
  },
  reducers: {
    addAnnouncement: (state, action) => {
      state.announcements.push(action.payload);
    },
    deleteAnnouncement: (state, action) => {
      state.announcements = state.announcements.filter(a => a._id !== action.payload);
    },
    addAssignment: (state, action) => {
      state.assignments.push(action.payload);
    },
    updateAssignment: (state, action) => {
      const index = state.assignments.findIndex(a => a._id === action.payload._id);
      if (index !== -1) {
        state.assignments[index] = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPortalData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPortalData.fulfilled, (state, action) => {
        state.loading = false;
        state.classes = action.payload.classes;
        state.announcements = action.payload.announcements;
        state.assignments = action.payload.assignments;
        state.materials = action.payload.materials;
        state.results = action.payload.results;
        state.submissions = action.payload.submissions;
      })
      .addCase(fetchPortalData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { addAnnouncement, deleteAnnouncement, addAssignment, updateAssignment } = portalsSlice.actions;
export default portalsSlice.reducer;
