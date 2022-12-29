import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
   currentPlayingAudio,
   openAudioPlayer,
   startPlaying,
   stopPlaying,
} from "../../redux/audios/audioSlice";

import styles from "./ayahListItem.module.scss";

const AyahListItem = ({
   transText,
   arabicText,
   number,
   setPlaylist,
   audioUrl,
   ayahName,
   surahNumber,
}) => {
   const dispatch = useDispatch();
   const { isPlaying, currentPlayingAudio: currentAudio } = useSelector(
      (state) => state.audio
   );
   const isCurrPlaying = isPlaying && currentAudio.url === audioUrl;
   return (
      <div
         className={`${styles.mainWrapper} ${
            isCurrPlaying ? styles.active : ""
         }`}
      >
         <div className={styles.heading}>
            <span className={styles.number}>{number}</span>
            <button
               onClick={() => {
                  if (!isPlaying) {
                     setPlaylist();
                     dispatch(openAudioPlayer());
                     dispatch(
                        currentPlayingAudio({
                           audioUrl,
                           ayahName,
                           surahNumber,
                           ayahNumber: number,
                        })
                     );
                     dispatch(startPlaying());
                  } else {
                     if (currentAudio.url === audioUrl) {
                        return dispatch(stopPlaying());
                     }
                     dispatch(
                        currentPlayingAudio({
                           audioUrl,
                           ayahName,
                           surahNumber,
                           ayahNumber: number,
                        })
                     );
                     setPlaylist();
                  }
               }}
               className={styles.playBtn}
            >
               <img
                  src={
                     isCurrPlaying
                        ? "/images/pauseIcon.svg"
                        : "/images/playIcon.svg"
                  }
                  alt=""
               />
            </button>
         </div>
         <div className={styles.body}>
            <p className={styles.arabicText}>{arabicText}</p>
            <p className={styles.translatedText}>{transText}</p>
         </div>
      </div>
   );
};

export default AyahListItem;
