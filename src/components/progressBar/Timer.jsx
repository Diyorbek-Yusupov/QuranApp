import React, { useEffect, useState } from "react";

const Timer = ({ now, upcomingTime }) => {
   const [hour, setHour] = useState(0);
   const [min, setMin] = useState(0);
   const [sec, setSec] = useState(0);
   let interval;
   const getRemainingTime = () => {
      interval = setInterval(() => {
         const ramainingTime = upcomingTime - Date.now();
         setHour(Math.floor(ramainingTime / (1000 * 60 * 60)));
         setMin(Math.floor((ramainingTime / (1000 * 60)) % 60));
         setSec(Math.floor((ramainingTime / 1000) % 60));
      }, 1000);
      console.log("reaminTime");
   };
   useEffect(() => {
      getRemainingTime();
      return () => clearInterval(interval);
   }, []);

   return (
      <>
         -{hour.toString().padStart(2, 0)}:{min.toString().padStart(2, 0)}:
         {sec.toString().padStart(2, 0)}
      </>
   );
};

export default Timer;
