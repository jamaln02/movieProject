import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getCreditsDetails = createAsyncThunk(
  "getCreditsDetails",
  async (seriesid, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const details = await axios({
        method: "GET",
        url: `https://api.themoviedb.org/3/tv/${seriesid}/credits`,
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
  seriesCreditsDetailsLoading: false,
  seriesCreditsDetailsError: null,
  seriesCreditsDetailsdata: null,
};

const seriesCreditsDetails = createSlice({
  name: "seriesCreditsDetails",
  initialState: data,
  extraReducers: (builder) => {
    builder.addCase(getCreditsDetails.pending, (state, action) => {
      state.seriesCreditsDetailsLoading = true;
    });
    builder.addCase(getCreditsDetails.fulfilled, (state, action) => {
      state.seriesCreditsDetailsLoading = false;
      state.seriesCreditsDetailsdata = action.payload;
    });
    builder.addCase(getCreditsDetails.rejected, (state, action) => {
      state.seriesCreditsDetailsLoading = false;
      state.seriesCreditsDetailsError = action.error.message;
    });
  },
});

export const seriesCreditsDetail = seriesCreditsDetails.reducer;
