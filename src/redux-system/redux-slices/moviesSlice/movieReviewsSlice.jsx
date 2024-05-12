import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getMovieReviews = createAsyncThunk(
  "getMovieReviews",
  async (movieid, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const details = await axios({
        method: "GET",
        url: `https://api.themoviedb.org/3/movie/${movieid}/reviews`,
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
  movieReviewsData: null,
  movieReviewsLoading: false,
  movieReviewsError: null,
};

const movieReviews = createSlice({
  name: "movieReviews",
  initialState: data,
  extraReducers: (builder) => {
    builder.addCase(getMovieReviews.pending, (state, action) => {
      state.movieReviewsLoading = true;
    });
    builder.addCase(getMovieReviews.fulfilled, (state, action) => {
      state.movieReviewsLoading = false;
      state.movieReviewsData = action.payload.results;
    });
    builder.addCase(getMovieReviews.rejected, (state, action) => {
      state.movieReviewsLoading = false;
      state.movieReviewsError = action.error.message;
    });
  },
});

export const movieReview = movieReviews.reducer;
