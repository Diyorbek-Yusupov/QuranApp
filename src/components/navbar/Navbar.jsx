import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Languages from "../languages/Languages";
import styles from "./navbar.module.scss";

const Navbar = () => {
   const [inAyahs, setInAyahs] = useState(false);
   let location = useLocation();
   useEffect(() => {
      if (
         location.pathname.length >= 9 &&
         location.pathname.includes("surahs")
      ) {
         setInAyahs(true);
      } else {
         setInAyahs(false);
      }
   }, [location]);
   return (
      <div className={styles.navbar}>
         <div className="container">
            <div className={styles.container}>
               <h2 className={styles.title}>
                  <Link to="/">Quran app</Link>
                  {inAyahs && (
                     <span className={styles.sublink}>
                        <Link to="/surahs"> / Surahs</Link>
                     </span>
                  )}
               </h2>
               <div className={styles.navLeft}>
                  <Languages />
               </div>
            </div>
         </div>
      </div>
   );
};

export default Navbar;
