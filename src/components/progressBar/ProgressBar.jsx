import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import "./progressBar.scss";

const ProgressBar = ({ prayTimes }) => {
   const upcomingTime = useRef(null);
   const prevtime = useRef(null);
   const precent = useRef(null);
   const hour = useRef(0);
   const min = useRef(0);
   const sec = useRef(0);
   const [intervalID, setIntervalID] = useState(null);
   const [test, setTest] = useState(false);

   const { t } = useTranslation();

   const timeNames = ["Fajr", "Sunrise", "Dhuhr", "Asr", "Maghrib", "Isha'a"];

   const tick = () => {
      setIntervalID(
         setInterval(() => {
            const now = new Date();
            findUpcomingTime(prayTimes);

            const upcoming = new Date(
               now.getFullYear(),
               now.getMonth(),
               now.getDate() + upcomingTime.current.isTomorrow,
               parseInt(upcomingTime.current.value),
               parseInt(upcomingTime.current.value.slice(-2))
            );

            const prev = new Date(
               now.getFullYear(),
               now.getMonth(),
               now.getDate(),
               parseInt(prevtime.current),
               parseInt(prevtime.current.slice(-2))
            );
            const remainingTime = upcoming - now;

            hour.current = Math.floor(remainingTime / (1000 * 60 * 60));
            min.current = Math.floor((remainingTime / 1000 / 60) % 60);
            sec.current = Math.floor((remainingTime / 1000) % 60);
            precent.current = 100 - remainingTime / ((upcoming - prev) / 100);

            setTest((val) => !val);
         }, 1000)
      );
   };

   const findUpcomingTime = (data) => {
      let nearestTime = Number.MAX_SAFE_INTEGER;
      const now = new Date();
      let founded = false;
      for (const [key, value] of Object.entries(data.today)) {
         const hour = parseInt(value);
         const min = parseInt(value.slice(-2));
         const prayTime = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate(),
            hour,
            min
         );
         if (prayTime > now) {
            founded = true;
            if (nearestTime > prayTime - now) {
               nearestTime = prayTime - now;
               upcomingTime.current = {
                  nameIndex: timeNames.indexOf(key),
                  value,
                  isTomorrow: false,
               };
               prevtime.current =
                  data.today[timeNames[timeNames.indexOf(key) - 1]];
            }
            // nearestTime;
         }
      }
      if (!founded) {
         upcomingTime.current = {
            nameIndex: 0,
            value: data.today.Fajr,
            isTomorrow: true,
         };
         prevtime.current = data.today["Isha'a"];
      }
   };

   useEffect(() => {
      tick();
      return () => clearInterval(intervalID);
   }, []);

   if (!prevtime.current || !upcomingTime.current) return;
   return (
      <div className="customProgressBar">
         <div className="card">
            <div className="percent">
               <svg>
                  <circle cx="105" cy="105" r="100"></circle>
                  <circle
                     cx="105"
                     cy="105"
                     r="100"
                     style={{
                        strokeDashoffset: `calc(625px - (625px * ${precent.current}) / 100)`,
                     }}
                  ></circle>
               </svg>
               <div className="number">
                  <h3 className="progressIndex">
                     <span className="progressbarTitle">
                        {t(`prayTimes.${upcomingTime.current.nameIndex}`)}
                     </span>
                     <span className="progressbarBody">
                        {upcomingTime.current.value}
                     </span>
                     <span className="progressbarSubttle">
                        - <span>{hour.current.toString().padStart(2, 0)}</span>
                        <span> :</span>
                        <span>{min.current.toString().padStart(2, 0)}</span>
                        <span> :</span>
                        <span>{sec.current.toString().padStart(2, 0)}</span>
                     </span>
                  </h3>
               </div>
            </div>
         </div>
      </div>
   );
};

export default ProgressBar;
