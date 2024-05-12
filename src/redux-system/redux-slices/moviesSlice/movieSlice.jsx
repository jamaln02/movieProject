import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllMovies = createAsyncThunk(
  "getAllMovies",
  async (i = 1, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const movies = await axios({
        method: "GET",
        url: "https://api.themoviedb.org/3/movie/now_playing",
        params: { language: "en-US", page: i },
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjUwNmVjNjNjMDE4MWY4NzQ2ZmQzMzg1ODA5ZjYyNyIsInN1YiI6IjY2MmFiMzk0YjUxM2E4MDExZTNlYmQxMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FuwTTRjzMMrktYqWyHBVf8EyrhigIi654qnc_5JdjCU",
        },
      });
      return movies.data;
    } catch (er) {
      return rejectWithValue(er);
    }
  }
);

const data = {
  movies: [],
  moviesLoading: false,
  moviesErorr: null,
  topMovies: [],
};

const movieSlice = createSlice({
  name: "allMovie",
  initialState: data,
  extraReducers: (builder) => {
    builder.addCase(getAllMovies.pending, (state, action) => {
      state.moviesLoading = true;
    });
    builder.addCase(getAllMovies.fulfilled, (state, action) => {
      state.moviesLoading = false;
      state.movies = action.payload.results;
      state.topMovies = action.payload.results.filter(
        (ele) => ele.vote_average > 7
      );
    });
    builder.addCase(getAllMovies.rejected, (state, action) => {
      state.moviesLoading = false;
      state.moviesErorr = action.payload.message;
    });
  },
});

export const movies = movieSlice.reducer;
