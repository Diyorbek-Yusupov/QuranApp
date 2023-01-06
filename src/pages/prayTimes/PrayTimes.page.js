import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import Navbar from "../../components/navbar/Navbar";
import ProgressBar from "../../components/progressBar/ProgressBar";
import SinglePrayTime from "../../components/singlePrayTime/SinglePrayTime";
import Skeleton from "../../components/skeleton/Skeleton";

import styles from "./prayTimes.module.scss";
import AlertBox from "../../components/alertBox/AlertBox";

const PrayTimes = () => {
   const [isLoading, setIsloading] = useState(true);
   const [prayTimes, setPrayTimes] = useState(null);
   const [locationAcces, setLocationAcces] = useState(false);
   const [isShowingAlertBox, setIsShowingAlertBox] = useState(true);
   const [errorMsg, setErrorMsg] = useState(null);

   const { t } = useTranslation();
   const date = new Date();
   const coords = { lat: 0, lon: 0 };
   const timeNames = ["Fajr", "Sunrise", "Dhuhr", "Asr", "Maghrib", "Isha'a"];
   let locationAccessChangeRef = useRef(null);
   const searchInputVal = useRef("");

   document.title = t("prayTime");

   const lococationPermissonChangeEvent = () => {
      navigator.permissions
         .query({ name: "geolocation" })
         .then((permissionStatus) => {
            setLocationAcces(permissionStatus.state === "granted");
            permissionStatus.onchange = () => {
               setLocationAcces(permissionStatus.state === "granted");
               if (permissionStatus.state === "granted") {
                  getCurrPlaceTimes();
               }
            };
            locationAccessChangeRef.current = () => {
               permissionStatus.onchange = null;
            };
         });
   };

   const getPosition = () => {
      return new Promise((res, rej) => {
         navigator.geolocation.getCurrentPosition(
            ({ coords: data }) => {
               coords.lat = data.latitude;
               coords.lon = data.longitude;
               res();
            },
            (error) => {
               rej(error);
            }
         );
      });
   };

   const getCurrPlaceTimes = async (cityName) => {
      setErrorMsg(null);
      setIsloading(true);
      let locationIsFound = true;
      try {
         await getPosition();
      } catch (error) {
         setIsloading(false);
         locationIsFound = false;
      }
      if (!locationIsFound && !cityName) return;
      setIsloading(true);
      let searchingCity;

      if (!cityName) {
         const {
            data: {
               features: [
                  {
                     properties: { city: detectedCity },
                  },
               ],
            },
         } = await axios.get(
            `https://api.geoapify.com/v1/geocode/reverse?lat=${coords.lat}&lon=${coords.lon}&apiKey=da1020c698d44f8da27d6998ad232fd8`
         );
         searchingCity = detectedCity;
      } else {
         searchingCity = cityName;
      }

      try {
         const { data } = await axios.get(
            `https://dailyprayer.abdulrcs.repl.co/api/${searchingCity}`
         );
         if (data.Error) throw new Error("Result Not Found");
         setPrayTimes(data);
      } catch (error) {
         setErrorMsg({ message: error.message, type: "error" });
      }
      setIsloading(false);
   };
   useEffect(() => {
      if (!prayTimes) {
         getCurrPlaceTimes();
         lococationPermissonChangeEvent();
      }
      return () => {
         return (() => {
            locationAccessChangeRef.current();
         })();
      };
   }, []);

   return (
      <div className={styles.mainWrapper}>
         <Navbar />

         <div className="container">
            {!locationAcces ? (
               <AlertBox type={"warning"}>{t("locationAccessError")}!</AlertBox>
            ) : null}
            <form
               onSubmit={(e) => {
                  e.preventDefault();
                  getCurrPlaceTimes(searchInputVal.current);
               }}
               className={styles.cityForm}
            >
               <input
                  className={styles.cityFormInput}
                  placeholder={t("cityNameSearch")}
                  type="search"
                  onChange={(e) => (searchInputVal.current = e.target.value)}
               />
               <button type="submit" className={styles.cityFormBtn}>
                  <img src="/images/searchIcon.svg" alt="" />
               </button>
            </form>
            {isLoading ? (
               <Skeleton />
            ) : errorMsg ? (
               <AlertBox type={"error"}>{errorMsg.message}</AlertBox>
            ) : !prayTimes ? (
               ""
            ) : (
               <>
                  <div className={styles.headWrapper}>
                     <div className={styles.metaDatas}>
                        <div className={styles.imgWrap}>
                           <img src="/images/locationIcon.svg" alt="" />
                        </div>
                        <h3 className={styles.city}>{prayTimes?.city}</h3>
                        <img src="/images/calendar.svg" alt="" />
                        <h4 className={styles.date}>
                           {date.getDate() +
                              " - " +
                              t(`months.${date.getMonth()}`)}
                           , {date.getFullYear() + " - " + t("tYear")},{" "}
                           {t(`weekdays.${date.getDay()}`)}
                        </h4>
                     </div>
                     <div className={styles.barWrapper}>
                        {prayTimes && <ProgressBar prayTimes={prayTimes} />}
                     </div>
                  </div>
                  <div className={styles.timeWrapper}>
                     {prayTimes &&
                        Object.entries(prayTimes.today).map(
                           ([timeName, timeValue], index) => (
                              <SinglePrayTime
                                 key={index}
                                 timeName={t(
                                    `prayTimes.${timeNames.indexOf(timeName)}`
                                 )}
                                 timeValue={timeValue}
                                 imgUrl={timeNames[index]}
                              />
                           )
                        )}
                  </div>
               </>
            )}
         </div>
      </div>
   );
};

export default PrayTimes;
