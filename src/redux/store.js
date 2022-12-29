import { configureStore } from "@reduxjs/toolkit";
import audioReducer from "./audios/audioSlice";

export const store = configureStore({
   reducer: {
      audio: audioReducer,
   },
});
