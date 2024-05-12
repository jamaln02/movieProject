import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getMovieRecommendations = createAsyncThunk(
  "getMovieRecommendations",
  async (movieid, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const details = await axios({
        method: "GET",
        url: `https://api.themoviedb.org/3/movie/${movieid}/recommendations`,
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
  movieRecommendationsData: null,
  movieRecommendationsLoading: false,
  movieRecommendationsError: null,
};

const movieRecommendations = createSlice({
  name: "movieRecommendations",
  initialState: data,
  extraReducers: (builder) => {
    builder.addCase(getMovieRecommendations.pending, (state, action) => {
      state.movieRecommendationsLoading = true;
    });
    builder.addCase(getMovieRecommendations.fulfilled, (state, action) => {
      state.movieRecommendationsLoading = false;
      state.movieRecommendationsData = action.payload.results;
    });
    builder.addCase(getMovieRecommendations.rejected, (state, action) => {
      state.movieRecommendationsLoading = false;
      state.movieRecommendationsError = action.error.message;
    });
  },
});

export const moviesRecommendation = movieRecommendations.reducer;
