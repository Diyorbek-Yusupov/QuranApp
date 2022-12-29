import axios from "axios";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Loader from "../../components/loader/Loader";
import SurahListItem from "../../components/surahListItem/SurahListItem";
import styles from "./surahList.module.scss";

const SurahList = () => {
   const [surahs, setSurahs] = useState([]);
   const [query, setQuery] = useState("");
   const [isLoading, setIsLoading] = useState(true);

   const { t } = useTranslation();

   document.title = t("surahPage.pageName");

   const filterSurahs = () =>
      surahs.filter((surah) =>
         surah.englishName.toLowerCase().includes(query.toLowerCase())
      );

   useEffect(() => {
      setIsLoading(true);
      axios
         .get("http://api.alquran.cloud/v1/surah")
         .then((response) => response.data)
         .then(({ data }) => setSurahs(data))
         .finally(() => setIsLoading((prevVal) => !prevVal));
   }, []);

   if (isLoading) return <Loader />;

   return (
      <div className={styles.mainWrapper}>
         <div className="container">
            <div className={styles.formGroup}>
               <img
                  className={styles.searchIcon}
                  src="images/searchIcon.svg"
                  alt=""
               />
               <input
                  className={styles.searchInput}
                  placeholder={t("surahPage.placeholder")}
                  type="text"
                  value={query}
                  onChange={(e) => {
                     setQuery(e.target.value);
                  }}
               />
            </div>
            <div className={styles.listWrapper}>
               {filterSurahs().map((surah) => {
                  return <SurahListItem key={surah.number} {...surah} />;
               })}
            </div>
         </div>
      </div>
   );
};

export default SurahList;
