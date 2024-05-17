import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getMovieSearchResults = createAsyncThunk(
  "getMovieSearchResults",
  async (key, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const details = await axios({
        method: "GET",
        url: "https://api.themoviedb.org/3/search/movie",
        params: {
          query: key,
          include_adult: "false",
          language: "en-US",
          page: "1",
        },
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjUwNmVjNjNjMDE4MWY4NzQ2ZmQzMzg1ODA5ZjYyNyIsInN1YiI6IjY2MmFiMzk0YjUxM2E4MDExZTNlYmQxMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FuwTTRjzMMrktYqWyHBVf8EyrhigIi654qnc_5JdjCU",
        },
      });

      return details.data.results;
    } catch (er) {
      return rejectWithValue(er);
    }
  }
);

export const getSeriesSearchResults = createAsyncThunk(
  "getSeriesSearchResults",
  async (key, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const details = await axios({
        method: "GET",
        url: "https://api.themoviedb.org/3/search/tv",
        params: {
          query: key,
          include_adult: "false",
          language: "en-US",
          page: "1",
        },
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjUwNmVjNjNjMDE4MWY4NzQ2ZmQzMzg1ODA5ZjYyNyIsInN1YiI6IjY2MmFiMzk0YjUxM2E4MDExZTNlYmQxMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FuwTTRjzMMrktYqWyHBVf8EyrhigIi654qnc_5JdjCU",
        },
      });

      return details.data.results;
    } catch (er) {
      return rejectWithValue(er);
    }
  }
);

const data = {
  movieSearchResults: null,
  movieSearchLoading: false,
  movieSearchError: null,
  seriesSearchResults: null,
  seriesSearchLoading: false,
  seriesSearchError: null,
  inputValue: "",
  listOpen: false,
};

const searchResults = createSlice({
  name: "searchResults",
  initialState: data,
  reducers: {
    handleSearch: (state, action) => {
      state.inputValue = action.payload.target.value;
      if (state.inputValue !== "") {
        state.listOpen = true;
      }
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getMovieSearchResults.pending, (state, action) => {
      state.movieSearchLoading = true;
    });
    builder.addCase(getMovieSearchResults.fulfilled, (state, action) => {
      state.movieSearchLoading = false;
      state.movieSearchResults = action.payload;
    });
    builder.addCase(getMovieSearchResults.rejected, (state, action) => {
      state.movieSearchLoading = false;
      state.movieSearchError = action.error.message;
    });

    builder.addCase(getSeriesSearchResults.pending, (state, action) => {
      state.seriesSearchLoading = true;
    });
    builder.addCase(getSeriesSearchResults.fulfilled, (state, action) => {
      state.seriesSearchLoading = false;
      state.seriesSearchResults = action.payload;
    });
    builder.addCase(getSeriesSearchResults.rejected, (state, action) => {
      state.seriesSearchLoading = false;
      state.seriesSearchError = action.error.message;
    });
  },
});

export const searchResult = searchResults.reducer;
export const { handleSearch } = searchResults.actions;
