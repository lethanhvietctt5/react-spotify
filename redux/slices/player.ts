import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface IPlayer {
  shuffle: boolean;
  duration_ms: number;
  paused: boolean;
  repeat_mode: number;
  track_id: string;
  image: string;
  artist: string;
  name: string;
  device_id: string;
  uri: string;
  offset: number;
  position: number;
  volume: number;
}

const initialState = {
  shuffle: false,
  duration_ms: 0,
  paused: true,
  repeat_mode: false,
  track_id: "",
  image: "",
  artist: "",
  name: "",
  device_id: "",
  uri: "",
  offset: 0,
  position: 0,
  volume: 50,
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setShuffle: (state, action) => {
      state.shuffle = action.payload;
    },
    setDuration: (state, action) => {
      state.duration_ms = action.payload;
    },
    setRepeat: (state, action) => {
      state.repeat_mode = action.payload;
    },
    setTrackID: (state, action) => {
      state.track_id = action.payload;
    },
    setImage: (state, action) => {
      state.image = action.payload;
    },
    setArtist: (state, action) => {
      state.artist = action.payload;
    },
    setName: (state, action) => {
      state.name = action.payload;
    },
    setOffset: (state, action) => {
      state.offset = action.payload;
    },
    setURI: (state, action) => {
      state.uri = action.payload;
    },
    setDeviceID: (state, action) => {
      state.device_id = action.payload;
    },
    setPosition: (state, action) => {
      state.position = action.payload;
    },
    setPaused: (state, action) => {
      state.paused = action.payload;
    },
    setVolume: (state, action) => {
      state.volume = action.payload.payload;
    },
  },
});

export const {
  setShuffle,
  setDuration,
  setRepeat,
  setTrackID,
  setImage,
  setArtist,
  setName,
  setOffset,
  setURI,
  setDeviceID,
  setPosition,
  setPaused,
  setVolume,
} = playerSlice.actions;

export default playerSlice.reducer;
