import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Languages from "../../components/languages/Languages";
import styles from "./home.module.scss";
const Home = () => {
   const { t } = useTranslation();
   document.title = t("homePage.pageName");
   return (
      <div className={styles.home}>
         // <h1 className={styles.title}>
         //    Quran app <i>by Albison (Diyorbek)</i>
         // </h1>
         <p className={styles.subtitle}>{t("homePage.subtitle")}</p>
         <div className={styles.imgWrapper}>
            <img
               draggable="false"
               className={styles.book}
               src="images/Quran.svg"
               alt=""
            />
            <img
               draggable="false"
               className={styles.shadow}
               src="images/book-shadow.png"
               alt=""
            />
         </div>
         <div className={styles.actionsWpapper}>
            <div className={styles.btns}>
               <Link to="/surahs">
                  <button className={styles.btn}>{t("Koran")} </button>
               </Link>
               <Link to="/prayTimes">
                  <button className={styles.btn}>{t("prayTime")}</button>
               </Link>
            </div>
            <Languages />
         </div>
      </div>
   );
};

export default Home;
