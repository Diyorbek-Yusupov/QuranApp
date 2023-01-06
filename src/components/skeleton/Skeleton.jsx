import React from "react";
import styles from "./skeleton.module.scss";

const Skeleton = () => {
   return (
      <div>
         <div className={styles.headwrap}>
            <div className={styles.textWrap}>
               <div className={styles.text}></div>
               <div className={styles.text}></div>
            </div>
            <div className={styles.circle}></div>
         </div>
         <div className={styles.itemsWrap}>
            <div className={styles.card}>
               <div className={styles.square}></div>
               <div className={styles.cardBody}>
                  <div className={styles.text}></div>
                  <div className={styles.minText}></div>
               </div>
            </div>
            <div className={styles.card}>
               <div className={styles.square}></div>
               <div className={styles.cardBody}>
                  <div className={styles.text}></div>
                  <div className={styles.minText}></div>
               </div>
            </div>
            <div className={styles.card}>
               <div className={styles.square}></div>
               <div className={styles.cardBody}>
                  <div className={styles.text}></div>
                  <div className={styles.minText}></div>
               </div>
            </div>
            <div className={styles.card}>
               <div className={styles.square}></div>
               <div className={styles.cardBody}>
                  <div className={styles.text}></div>
                  <div className={styles.minText}></div>
               </div>
            </div>
            <div className={styles.card}>
               <div className={styles.square}></div>
               <div className={styles.cardBody}>
                  <div className={styles.text}></div>
                  <div className={styles.minText}></div>
               </div>
            </div>
            <div className={styles.card}>
               <div className={styles.square}></div>
               <div className={styles.cardBody}>
                  <div className={styles.text}></div>
                  <div className={styles.minText}></div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Skeleton;
