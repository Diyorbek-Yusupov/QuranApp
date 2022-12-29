import React from "react";
import "./loader.scss";

const Loader = () => {
   return (
      <div className="loader-wrapper">
         <div className="spinner-box">
            <div className="configure-border-1">
               <div className="configure-core"></div>
            </div>
            <div className="configure-border-2">
               <div className="configure-core"></div>
            </div>
         </div>
      </div>
   );
};

export default Loader;
