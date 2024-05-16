import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getSeriesRecommendations = createAsyncThunk(
  "getSeriesRecommendations",
  async (seriesid, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const details = await axios({
        method: "GET",
        url: `https://api.themoviedb.org/3/tv/${seriesid}/recommendations`,
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
  seriesRecommendationsData: null,
  seriesRecommendationsLoading: false,
  seriesRecommendationsError: null,
};

const seriesRecommendations = createSlice({
  name: "seriesRecommendations",
  initialState: data,
  extraReducers: (builder) => {
    builder.addCase(getSeriesRecommendations.pending, (state, action) => {
      state.seriesRecommendationsLoading = true;
    });
    builder.addCase(getSeriesRecommendations.fulfilled, (state, action) => {
      state.seriesRecommendationsLoading = false;
      state.seriesRecommendationsData = action.payload.results;
    });
    builder.addCase(getSeriesRecommendations.rejected, (state, action) => {
      state.seriesRecommendationsLoading = false;
      state.seriesRecommendationsError = action.error.message;
    });
  },
});

export const seriesRecommendation = seriesRecommendations.reducer;
