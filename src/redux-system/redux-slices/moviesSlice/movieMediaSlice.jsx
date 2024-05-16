import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getBackDropsAndPosters = createAsyncThunk(
  "getBackDropsAndPosters",
  async (movieid, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const details = await axios({
        method: "GET",
        url: `https://api.themoviedb.org/3/movie/${movieid}/images`,

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

export const getMovieVideos = createAsyncThunk(
  "getMovieVideos",
  async (movieid, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const details2 = await axios({
        method: "GET",
        url: `https://api.themoviedb.org/3/movie/${movieid}/videos`,

        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjUwNmVjNjNjMDE4MWY4NzQ2ZmQzMzg1ODA5ZjYyNyIsInN1YiI6IjY2MmFiMzk0YjUxM2E4MDExZTNlYmQxMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FuwTTRjzMMrktYqWyHBVf8EyrhigIi654qnc_5JdjCU",
        },
      });

      return details2.data;
    } catch (er) {
      return rejectWithValue(er);
    }
  }
);

const data = {
  backdropsAndPosterData: null,
  backdropsAndPosterLoading: false,
  backdropsAndPosterError: null,
  movieVideosData: null,
  movieVideosLoading: false,
  movieVideosError: null,
};

const movieMedia = createSlice({
  name: "movieMedia",
  initialState: data,
  extraReducers: (builder) => {
    builder.addCase(getBackDropsAndPosters.pending, (state, action) => {
      state.backdropsAndPosterLoading = true;
    });
    builder.addCase(getBackDropsAndPosters.fulfilled, (state, action) => {
      state.backdropsAndPosterLoading = false;
      state.backdropsAndPosterData = action.payload;
    });
    builder.addCase(getBackDropsAndPosters.rejected, (state, action) => {
      state.backdropsAndPosterLoading = false;
      state.backdropsAndPosterError = action.error.message;
    });
    builder.addCase(getMovieVideos.pending, (state, action) => {
      state.movieVideosLoading = true;
    });
    builder.addCase(getMovieVideos.fulfilled, (state, action) => {
      state.movieVideosLoading = false;
      state.movieVideosData = action.payload;
    });
    builder.addCase(getMovieVideos.rejected, (state, action) => {
      state.movieVideosLoading = false;
      state.movieVideosError = action.error.message;
    });
  },
});

export const moviesMedia = movieMedia.reducer;
