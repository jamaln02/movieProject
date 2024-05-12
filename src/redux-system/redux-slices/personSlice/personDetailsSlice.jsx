import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getPersonDetails = createAsyncThunk(
  "getPersonDetails",
  async (personid, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const details = await axios({
        method: "GET",
        url: `https://api.themoviedb.org/3/person/${personid}`,
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

export const getDetailsActorKnownFor = createAsyncThunk(
  "getDetailsActorKnownFor",
  async (personname, ThunkAPI) => {
    const { rejectWithValue } = ThunkAPI;
    try {
      const details = await axios({
        method: "GET",
        url: `https://api.themoviedb.org/3/search/person`,
        params: {
          query: personname,
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
  personDetailsData: null,
  personDetailsError: null,
  personDetailsLoading: false,
  actorKnownFor: [],
};

const personDetails = createSlice({
  name: "personDetails",
  initialState: data,
  extraReducers: (builder) => {
    builder.addCase(getPersonDetails.pending, (state, action) => {
      state.personDetailsLoading = true;
    });
    builder.addCase(getPersonDetails.fulfilled, (state, action) => {
      state.personDetailsLoading = false;
      state.personDetailsData = action.payload;
    });
    builder.addCase(getPersonDetails.rejected, (state, action) => {
      state.personDetailsLoading = false;
      state.personDetailsError = action.error.message;
    });
    builder.addCase(getDetailsActorKnownFor.pending, (state, action) => {
      state.personDetailsLoading = true;
    });
    builder.addCase(getDetailsActorKnownFor.fulfilled, (state, action) => {
      state.personDetailsLoading = false;
      state.actorKnownFor = action.payload;
    });
    builder.addCase(getDetailsActorKnownFor.rejected, (state, action) => {
      state.personDetailsLoading = false;
      state.personDetailsError = action.error.message;
    });
  },
});

export const personDetail = personDetails.reducer;
