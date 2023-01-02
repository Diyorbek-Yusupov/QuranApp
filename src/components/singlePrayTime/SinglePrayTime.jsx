import React from "react";
import styles from "./singlePrayTime.module.scss";

const SinglePrayTime = ({ timeName, timeValue, imgUrl }) => {
   return (
      <div className={styles.singleTime}>
         <div className={styles.imgBox}>
            <img src={`/images/${imgUrl}.svg`} alt="" />
         </div>
         <div className="">
            <h4 className={styles.timeTitle}>{timeName}</h4>
            <p className={styles.timeValue}>{timeValue}</p>
         </div>
      </div>
   );
};

export default SinglePrayTime;
