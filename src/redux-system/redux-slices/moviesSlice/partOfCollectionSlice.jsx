import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getCollectionsDetails = createAsyncThunk(
  "getCollectionsDetails",
  async (collectaionsid, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const details = await axios({
        method: "GET",
        url: `https://api.themoviedb.org/3/collection/${collectaionsid}`,

        params: { language: "en-US" },

        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjUwNmVjNjNjMDE4MWY4NzQ2ZmQzMzg1ODA5ZjYyNyIsInN1YiI6IjY2MmFiMzk0YjUxM2E4MDExZTNlYmQxMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FuwTTRjzMMrktYqWyHBVf8EyrhigIi654qnc_5JdjCU",
        },
      });
      return details.data;
    } catch (er) {
      return rejectWithValue(er);
    }
  }
);

const data = {
  collectionsDetailsData: {},
  collectionsDetailsLoading: false,
  collectionsDetailsError: "",
};

const collectionsDetails = createSlice({
  name: "collectionsDetails",
  initialState: data,
  extraReducers: (builder) => {
    builder.addCase(getCollectionsDetails.pending, (state, action) => {
      state.collectionsDetailsLoading = true;
    });
    builder.addCase(getCollectionsDetails.fulfilled, (state, action) => {
      state.collectionsDetailsLoading = false;
      state.collectionsDetailsData = action.payload;
    });
    builder.addCase(getCollectionsDetails.rejected, (state, action) => {
      state.collectionsDetailsLoading = false;
      state.collectionsDetailsError = action.error.message;
    });
  },
});

export const collectionDetails = collectionsDetails.reducer;
