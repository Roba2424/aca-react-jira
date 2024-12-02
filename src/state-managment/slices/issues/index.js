import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db } from "../../../services/firebase";
import { FIRESTORE_PATH_NAMES } from "../../../core/utils/constants";
import { collection, getDocs } from "@firebase/firestore";

const initialState = {
  issueColumns: [],
  isLoading: false,
};

export const fetchIssueData = createAsyncThunk(
  "data/fetchIssueData",
  async () => {
    const queryData = await getDocs(
      collection(db, FIRESTORE_PATH_NAMES.ISSUES)
    );
    return queryData.docs.map((doc) => {
      return doc.data();
    });
  }
);

const issueSlice = createSlice({
  name: "issue",
  initialState,
  reducers: {},
  extraReducers: (promise) => {
    promise
      .addCase(fetchIssueData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchIssueData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.issueColumns = action.payload;
      });
  },
});

export const {} = issueSlice.actions;
export default issueSlice.reducer;
