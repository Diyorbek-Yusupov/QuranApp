import React from "react";
import { Outlet } from "react-router-dom";
import AudioPlayer from "../components/audioPlayer/AudioPlayer";

const PlayerLayout = () => {
   return (
      <div>
         <Outlet />
         <AudioPlayer />
      </div>
   );
};

export default PlayerLayout;
