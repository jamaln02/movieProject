import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getSeriesReviews = createAsyncThunk(
  "getSeriesReviews",
  async (seriesid, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const details = await axios({
        method: "GET",
        url: `https://api.themoviedb.org/3/tv/${seriesid}/reviews`,
        params: { language: "en-US", page: "1" },
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
  seriesReviewsData: null,
  seriesReviewsLoading: false,
  seriesReviewsError: null,
};

const seriesReviews = createSlice({
  name: "seriesReviews",
  initialState: data,
  extraReducers: (builder) => {
    builder.addCase(getSeriesReviews.pending, (state, action) => {
      state.seriesReviewsLoading = true;
    });
    builder.addCase(getSeriesReviews.fulfilled, (state, action) => {
      state.seriesReviewsLoading = false;
      state.seriesReviewsData = action.payload.results;
    });
    builder.addCase(getSeriesReviews.rejected, (state, action) => {
      state.seriesReviewsLoading = false;
      state.seriesReviewsError = action.error.message;
    });
  },
});

export const seriesReview = seriesReviews.reducer;
