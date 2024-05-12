import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getMovieDetails = createAsyncThunk(
  "getMovieDetails",
  async (movieid, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const details = await axios({
        method: "GET",
        url: `https://api.themoviedb.org/3/movie/${movieid}`,
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
  movieDetailsLoading: false,
  movieDetailsError: null,
  movieDetailsdata: null,
};

const movieDetails = createSlice({
  name: "movieDetails",
  initialState: data,
  extraReducers: (builder) => {
    builder.addCase(getMovieDetails.pending, (state, action) => {
      state.movieDetailsLoading = true;
    });
    builder.addCase(getMovieDetails.fulfilled, (state, action) => {
      state.movieDetailsLoading = false;
      state.movieDetailsdata = action.payload;
    });
    builder.addCase(getMovieDetails.rejected, (state, action) => {
      state.movieDetailsLoading = false;
      state.movieDetailsError = action.error.message;
    });
  },
});

export const moviesDetails = movieDetails.reducer;
