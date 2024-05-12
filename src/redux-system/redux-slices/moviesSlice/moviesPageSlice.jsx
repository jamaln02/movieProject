import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getMoviesPage = createAsyncThunk(
  "getMoviesPage",
  async (i = 1, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    console.log(i);

    try {
      const info = await axios({
        method: "GET",
        url: "https://api.themoviedb.org/3/movie/popular",
        params: { language: "en-US", page: i },
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjUwNmVjNjNjMDE4MWY4NzQ2ZmQzMzg1ODA5ZjYyNyIsInN1YiI6IjY2MmFiMzk0YjUxM2E4MDExZTNlYmQxMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FuwTTRjzMMrktYqWyHBVf8EyrhigIi654qnc_5JdjCU",
        },
      });
      return info.data;
    } catch (er) {
      return rejectWithValue(er);
    }
  }
);

const data = {
  moviesPageData: [],
  moviesPageLoading: false,
  moviesPageErorr: null,
  count: 1,
};

const moviesPageSlice = createSlice({
  name: "moviesPage",
  initialState: data,
  reducers: {
    increment: (state, action) => {
      if (state.count < 500) {
        state.count = action.payload + 1;
      }
    },
    decrement: (state, action) => {
      if (state.count > 1) {
        state.count = action.payload - 1;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getMoviesPage.pending, (state, action) => {
      state.moviesPageLoading = true;
    });
    builder.addCase(getMoviesPage.fulfilled, (state, action) => {
      state.moviesPageLoading = false;
      state.moviesPageData = action.payload.results;
      action.meta.arg = state.count;
    });
    builder.addCase(getMoviesPage.rejected, (state, action) => {
      state.moviesPageLoading = false;
      state.moviesPageErorr = action.payload.message;
    });
  },
});

export const moviesPage = moviesPageSlice.reducer;
export const { increment, decrement } = moviesPageSlice.actions;
