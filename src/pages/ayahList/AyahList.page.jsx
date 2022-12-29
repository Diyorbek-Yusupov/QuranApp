import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import AyahListItem from "../../components/ayahListItem/AyahListItem";
import Loader from "../../components/loader/Loader";
import styles from "./ayahList.module.scss";
import { setPlaylist } from "../../redux/audios/audioSlice";
import { PlaylistsContext } from "../../context/lngContext";

const AyahList = () => {
   const { t, i18n } = useTranslation();
   const [transTexts, setTransTexts] = useState({});
   const [arabicTexts, setArabicTexts] = useState([]);
   const [audios, setAudios] = useState([]);
   const [isLoading, setIsLoading] = useState(true);

   const { setCurrentPlaylistContext } = useContext(PlaylistsContext);

   const dispatch = useDispatch();

   const { id } = useParams();
   let edition;

   const getAllData = () => {
      switch (i18n.resolvedLanguage) {
         case "ru":
            edition = "ru.kuliev";
            break;
         case "uz":
            edition = "uz.sodik";
            break;
         default:
            edition = "en.asad";
      }
      // prettier-ignore
      const transText = axios.get(`https://api.alquran.cloud/v1/surah/${id}/${edition}`);
      const arabicText = axios.get(`https://api.alquran.cloud/v1/surah/${id}`);
      // prettier-ignore
      const arabicAudio = axios.get(`https://api.alquran.cloud/v1/surah/${id}/ar.alafasy`);
      setIsLoading(true);
      axios
         .all([transText, arabicText, arabicAudio])
         .then(
            axios.spread(
               ({ data: data1 }, { data: data2 }, { data: data3 }) => {
                  setTransTexts(data1.data);
                  setArabicTexts(data2.data.ayahs);
                  setAudios(data3.data.ayahs);
               }
            )
         )
         .finally(() => {
            setIsLoading(false);
         });
   };

   useEffect(() => {
      getAllData();
   }, [i18n.resolvedLanguage]);

   if (isLoading) return <Loader />;
   document.title = transTexts.englishName || "Loading...";
   return (
      <div className={styles.mainWrapper}>
         <div className="container">
            <div className={styles.banner}>
               <h3 className={styles.bannerTitle}>{transTexts.englishName}</h3>
               <h5 className={styles.bannerSubtitle}>
                  {transTexts.englishNameTranslation}
               </h5>
               <span className={styles.bannerText}>
                  {transTexts.revelationType} ⚫{" "}
                  {t("surahPage.ayah", {
                     numberOfAyahs: transTexts.numberOfAyahs,
                  })}
               </span>
               <h2 className={styles.arabicTitle}>{transTexts.name}</h2>
            </div>
            <div className={styles.ayahsContainer}>
               {transTexts.ayahs?.map((item, index) => {
                  return (
                     <AyahListItem
                        transText={item.text}
                        arabicText={arabicTexts[index].text}
                        number={item.numberInSurah}
                        key={item.numberInSurah}
                        setPlaylist={() => {
                           setCurrentPlaylistContext(audios);
                           dispatch(setPlaylist(audios));
                        }}
                        audioUrl={audios[item.numberInSurah - 1].audio}
                        ayahName={transTexts.englishName}
                        surahNumber={transTexts.number}
                     />
                  );
               })}
            </div>
         </div>
      </div>
   );
};

export default AyahList;
