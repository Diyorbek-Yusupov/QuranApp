import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   isOpenAudioPlayer: false,
   isPlaying: false,
   currentPlayList: [],
   currentPlayingAudio: {},
};

export const audioSlice = createSlice({
   name: "audios",
   initialState,
   reducers: {
      openAudioPlayer: (state) => ({ ...state, isOpenAudioPlayer: true }),
      closeAudioPlayer: (state) => ({ ...state, isOpenAudioPlayer: false }),
      setPlaylist: (state, { payload }) => ({
         ...state,
         currentPlayList: payload,
      }),
      currentPlayingAudio: (state, { payload }) => ({
         ...state,
         currentPlayingAudio: {
            url: payload.audioUrl,
            ayahName: payload.ayahName,
            surahNumber: payload.surahNumber,
            ayahNumber: payload.ayahNumber,
         },
      }),
      startPlaying: (state) => ({
         ...state,
         isPlaying: true,
      }),
      stopPlaying: (state) => ({
         ...state,
         isPlaying: false,
      }),
   },
});

export const {
   openAudioPlayer,
   closeAudioPlayer,
   setPlaylist,
   currentPlayingAudio,
   startPlaying,
   stopPlaying,
} = audioSlice.actions;

export default audioSlice.reducer;
