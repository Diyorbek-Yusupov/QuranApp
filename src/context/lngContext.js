import { createContext } from "react";

export const ValidLanguages = createContext({
   en: { nativeName: "English" },
   uz: { nativeName: "Uzbek" },
   ru: { nativeName: "Русский" },
});

const playListConfig = {
   playlist: [],
   setCurrentPlaylistContext: (playListInput) => {
      playListConfig.playlist = playListInput;
   },
};

export const PlaylistsContext = createContext(playListConfig);
