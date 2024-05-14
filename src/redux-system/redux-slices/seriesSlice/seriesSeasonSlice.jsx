import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getSeriesSeason = createAsyncThunk(
  "getSeriesSeason",
  async ({ seriesid, seasonnum }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const details = await axios({
        method: "GET",
        url: `https://api.themoviedb.org/3/tv/${seriesid}/season/${seasonnum}`,
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
  seriesSeasonData: null,
  seriesSeasonLoading: false,
  seriesSeasonError: null,
};

const seriesSeason = createSlice({
  name: "seriesSeason",
  initialState: data,
  extraReducers: (builder) => {
    builder.addCase(getSeriesSeason.pending, (state, action) => {
      state.seriesSeasonLoading = true;
    });
    builder.addCase(getSeriesSeason.fulfilled, (state, action) => {
      state.seriesSeasonLoading = false;
      state.seriesSeasonData = action.payload;
      console.log(action);
    });
    builder.addCase(getSeriesSeason.rejected, (state, action) => {
      state.seriesSeasonLoading = false;
      state.seriesSeasonError = action.error.message;
    });
  },
});

export const seriesSeasons = seriesSeason.reducer;
