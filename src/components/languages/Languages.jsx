import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { ValidLanguages } from "../../context/lngContext";
import styles from "./languages.module.scss";

const Languages = () => {
   const supportedLngs = useContext(ValidLanguages);
   const { t, i18n } = useTranslation();
   return (
      <div className={styles.selectGroup}>
         <h4>{t("lng")}: </h4>
         <select
            onChange={(e) => {
               i18n.changeLanguage(e.target.value);
            }}
            name="lng"
            id=""
            defaultValue={i18n.resolvedLanguage}
         >
            {Object.keys(supportedLngs).map((lng) => (
               <option
                  disabled={i18n.resolvedLanguage === lng}
                  style={{
                     color: i18n.resolvedLanguage === lng ? "#A44AFF" : "#000",
                  }}
                  key={lng}
                  value={lng}
               >
                  {supportedLngs[lng].nativeName}
               </option>
            ))}
         </select>
      </div>
   );
};

export default Languages;
