import React, { useState } from "react";
import styles from "./alertBox.module.scss";

const AlertBox = ({ children, type }) => {
   const [isVisible, setIsVisible] = useState(true);
   if (!isVisible) return;
   return (
      <div className={`${styles.container} ${styles[type]}`}>
         <span
            onClick={() => {
               setIsVisible(false);
            }}
         >
            &times;
         </span>
         <p className={styles.text}>{children}</p>
      </div>
   );
};

export default AlertBox;
