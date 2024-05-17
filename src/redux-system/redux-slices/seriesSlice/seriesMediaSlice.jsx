import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getBackDropsAndPosters = createAsyncThunk(
  "getBackDropsAndPosters",
  async (seriesid, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const details = await axios({
        method: "GET",
        url: `https://api.themoviedb.org/3/tv/${seriesid}/images`,

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

export const getSeriesVideos = createAsyncThunk(
  "getSeriesVideos",
  async (seriesid, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const details2 = await axios({
        method: "GET",
        url: `https://api.themoviedb.org/3/tv/${seriesid}/videos`,

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
  videosData: null,
  videosLoading: false,
  videosError: null,
};

const seriesMedia = createSlice({
  name: "seriesMedia",
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
    builder.addCase(getSeriesVideos.pending, (state, action) => {
      state.videosLoading = true;
    });
    builder.addCase(getSeriesVideos.fulfilled, (state, action) => {
      state.videosLoading = false;
      state.videosData = action.payload;
    });
    builder.addCase(getSeriesVideos.rejected, (state, action) => {
      state.videosLoading = false;
      state.videosError = action.error.message;
    });
  },
});

export const seriessMedia = seriesMedia.reducer;
