import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getSeriesPage = createAsyncThunk(
  "getSeriesPage",
  async (i = 1, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    console.log(i);

    try {
      const info = await axios({
        method: "GET",
        url: "https://api.themoviedb.org/3/tv/popular",
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
  seriesPageData: [],
  seriesPageLoading: false,
  seriesPageErorr: null,
  count: 1,
};

const seriesPageSlice = createSlice({
  name: "seriesPage",
  initialState: data,
  reducers: {
    increment: (state, action) => {
      if (state.count < 500) {
        console.log(action);
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
    builder.addCase(getSeriesPage.pending, (state, action) => {
      state.seriesPageLoading = true;
    });
    builder.addCase(getSeriesPage.fulfilled, (state, action) => {
      state.seriesPageLoading = false;
      state.seriesPageData = action.payload.results;
      action.meta.arg = state.count;
      console.log(action);
    });
    builder.addCase(getSeriesPage.rejected, (state, action) => {
      state.seriesPageLoading = false;
      state.seriesPageErorr = action.payload.message;
    });
  },
});

export const seriesPage = seriesPageSlice.reducer;
export const { increment, decrement } = seriesPageSlice.actions;
