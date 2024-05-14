import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getSeriesDetails = createAsyncThunk(
  "getSeriesDetails",
  async (seriesid, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const details = await axios({
        method: "GET",
        url: `https://api.themoviedb.org/3/tv/${seriesid}`,
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
  seriesDetailsLoading: false,
  seriesDetailsError: null,
  seriesDetailsdata: null,
};

const seriesDetails = createSlice({
  name: "seriesDetails",
  initialState: data,
  extraReducers: (builder) => {
    builder.addCase(getSeriesDetails.pending, (state, action) => {
      state.seriesDetailsLoading = true;
    });
    builder.addCase(getSeriesDetails.fulfilled, (state, action) => {
      state.seriesDetailsLoading = false;
      state.seriesDetailsdata = action.payload;
    });
    builder.addCase(getSeriesDetails.rejected, (state, action) => {
      state.seriesDetailsLoading = false;
      state.seriesDetailsError = action.error.message;
    });
  },
});

export const seriesDetail = seriesDetails.reducer;
