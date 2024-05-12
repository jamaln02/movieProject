import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllSeries = createAsyncThunk(
  "getAllSeries",
  async (i, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const series = await axios({
        method: "GET",
        url: "https://api.themoviedb.org/3/tv/airing_today",
        params: { language: "en-US", page: "1" },
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjUwNmVjNjNjMDE4MWY4NzQ2ZmQzMzg1ODA5ZjYyNyIsInN1YiI6IjY2MmFiMzk0YjUxM2E4MDExZTNlYmQxMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FuwTTRjzMMrktYqWyHBVf8EyrhigIi654qnc_5JdjCU",
        },
      });
      return series.data;
    } catch (er) {
      return rejectWithValue(er);
    }
  }
);

const data = {
  series: [],
  seriesLoading: false,
  seriesErorr: null,
  topSeries: [],
};

const seriesSlice = createSlice({
  name: "allSeries",
  initialState: data,
  extraReducers: (builder) => {
    builder.addCase(getAllSeries.pending, (state, action) => {
      state.seriesLoading = true;
    });
    builder.addCase(getAllSeries.fulfilled, (state, action) => {
      state.seriesLoading = false;
      state.series = action.payload.results;
      state.topSeries = action.payload.results.filter(
        (ele) => ele.vote_average > 6.5
      );
    });
    builder.addCase(getAllSeries.rejected, (state, action) => {
      state.seriesLoading = false;
      state.seriesErorr = action.payload.message;
    });
  },
});

export const series = seriesSlice.reducer;
