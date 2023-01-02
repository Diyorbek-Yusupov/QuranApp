import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import Loader from "../../components/loader/Loader";
import Navbar from "../../components/navbar/Navbar";
import ProgressBar from "../../components/progressBar/ProgressBar";

import styles from "./prayTimes.module.scss";

const PrayTimes = () => {
   const [isLoading, setIsloading] = useState(true);
   const [updatedTimer, setUpdatedTimer] = useState(0);
   const [prayTimes, setPrayTimes] = useState(null);

   const [upcomingTime, setUpcomingTime] = useState({});
   const [prevTime, setPrevtime] = useState("");
   const { t } = useTranslation();
   const date = new Date();
   const coords = { lat: 0, lon: 0 };
   const timeNames = ["Fajr", "Sunrise", "Dhuhr", "Asr", "Maghrib", "Isha'a"];

   document.title = t("prayTime");

   const getPosition = () => {
      return new Promise((res) => {
         navigator.geolocation.getCurrentPosition(({ coords: data }) => {
            coords.lat = data.latitude;
            coords.lon = data.longitude;
            res();
         });
      });
   };

   const findUpcomingTime = (data) => {
      let nearestTime = Number.MAX_SAFE_INTEGER;
      const now = Date.now();
      let founded = false;
      console.log(data);
      for (const [key, value] of Object.entries(data.today)) {
         const hour = parseInt(value);
         const min = parseInt(value.slice(-2));
         const prayTime = new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate(),
            hour,
            min
         );
         if (prayTime > now) {
            founded = true;
            if (nearestTime > prayTime - now) {
               nearestTime = prayTime - now;
               setUpcomingTime({
                  nameIndex: timeNames.indexOf(key),
                  value,
                  isTomorrow: false,
               });
               setPrevtime(data.today[timeNames[timeNames.indexOf(key) - 1]]);
            }
            // nearestTime;
         }
      }
      if (!founded) {
         setUpcomingTime({
            nameIndex: 0,
            value: data.today.Fajr,
            isTomorrow: false,
         });
         setPrevtime(data.today["Isha'a"]);
      }
   };

   const getCurrPlaceTimes = async () => {
      await getPosition();

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

      const { data } = await axios.get(
         `https://dailyprayer.abdulrcs.repl.co/api/${detectedCity}`
      );
      setPrayTimes(data);
      findUpcomingTime(data);
      setIsloading(false);
   };
   useEffect(() => {
      if (!prayTimes) {
         getCurrPlaceTimes();
      }

      // findUpcomingTime(prayTimes);
   }, [prayTimes]);
   console.log(prayTimes);
   console.log(upcomingTime);
   if (isLoading) return <Loader />;
   return (
      <div>
         <Navbar />
         <div className="container">
            <div className={styles.headWrapper}>
               <div className={styles.metaDatas}>
                  <div className={styles.imgWrap}>
                     <img src="/images/locationIcon.svg" alt="" />
                  </div>
                  <h3 className={styles.city}>{prayTimes?.city}</h3>
                  <img src="/images/calendar.svg" alt="" />
                  <h4 className={styles.date}>
                     {date.getDate() + " - " + t(`months.${date.getMonth()}`)},{" "}
                     {date.getFullYear() + " - " + t("tYear")},{" "}
                     {t(`weekdays.${date.getDay()}`)}
                  </h4>
               </div>
               <div className={styles.barWrapper}>
                  {console.log(prevTime)}
                  {prayTimes && <ProgressBar prayTimes={prayTimes} />}
               </div>
            </div>
         </div>
      </div>
   );
};

export default PrayTimes;
