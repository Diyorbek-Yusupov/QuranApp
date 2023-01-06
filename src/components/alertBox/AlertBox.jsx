import React, { useState } from "react";
import styles from "./alertBox.module.scss";

const AlertBox = ({ children }) => {
   const [isVisible, setIsVisible] = useState(true);
   if (!isVisible) return;
   return (
      <div className={styles.container}>
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
