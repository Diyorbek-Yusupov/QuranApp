import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import styles from "./surahListItem.module.scss";

const SurahListItem = ({
   englishName,
   englishNameTranslation,
   name,
   number,
   numberOfAyahs,
   revelationType,
}) => {
   const { t } = useTranslation();
   return (
      <Link className={styles.link} to={`${number}`}>
         <div className={styles.wrapper}>
            <div className={styles.itemNumber}>
               <img
                  className={styles.numberImg}
                  src="/images/star.svg"
                  alt=""
               />
               <span>{number}</span>
            </div>
            <div className={styles.itemBody}>
               <div className={styles.left}>
                  <h4 className={styles.itemTitle}>{englishName}</h4>
                  <div className={styles.subInfoBox}>
                     <h6 className={styles.subInfo}>
                        {englishNameTranslation}
                     </h6>
                     &#160;⚫&#160;
                     <h6 className={styles.subInfo}>{revelationType}</h6>
                  </div>
               </div>
               <div className={styles.right}>
                  <h4 className={styles.arabicTitle}>{name}</h4>
                  <h6 className={styles.subInfo}>
                     {t("surahPage.ayah", { numberOfAyahs })}
                  </h6>
               </div>
            </div>
         </div>
      </Link>
   );
};

export default SurahListItem;
