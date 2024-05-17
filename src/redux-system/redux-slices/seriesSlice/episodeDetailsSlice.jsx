import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getEpisodeDetails = createAsyncThunk(
  "getEpisodeDetails",
  async ({ seriesid, seasonid, episodeid }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const details = await axios({
        method: "GET",
        url: `https://api.themoviedb.org/3/tv/${seriesid}/season/${seasonid}/episode/${episodeid}`,
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

export const getCastAndCrew = createAsyncThunk(
  "getCastAndCrew",
  async ({ seriesid, seasonid, episodeid }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const details2 = await axios({
        method: "GET",
        url: `https://api.themoviedb.org/3/tv/${seriesid}/season/${seasonid}/episode/${episodeid}/credits`,
        params: { language: "en-US" },
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
  episodeDetailsData: null,
  episodeDetailsLoading: false,
  episodeDetailsError: null,
  castAndCrewData: null,
  castAndCrewLoading: false,
  castAndCrewError: null,
};

const episodeDetails = createSlice({
  name: "episodeDetails",
  initialState: data,
  extraReducers: (builder) => {
    builder.addCase(getEpisodeDetails.pending, (state, action) => {
      state.episodeDetailsLoading = true;
    });
    builder.addCase(getEpisodeDetails.fulfilled, (state, action) => {
      state.episodeDetailsLoading = false;
      state.episodeDetailsData = action.payload;
      console.log(action.payload);
    });
    builder.addCase(getEpisodeDetails.rejected, (state, action) => {
      state.episodeDetailsLoading = false;
      state.episodeDetailsError = action.error.message;
    });
    builder.addCase(getCastAndCrew.pending, (state, action) => {
      state.castAndCrewLoading = true;
    });
    builder.addCase(getCastAndCrew.fulfilled, (state, action) => {
      state.castAndCrewLoading = false;
      state.castAndCrewData = action.payload;
    });
    builder.addCase(getCastAndCrew.rejected, (state, action) => {
      state.castAndCrewLoading = false;
      state.castAndCrewError = action.error.message;
    });
  },
});

export const episodeDetail = episodeDetails.reducer;
