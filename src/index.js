import React from "react";
import { createRoot } from "react-dom/client";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import "./locales/i18n";
import "./index.scss";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

const root = createRoot(document.getElementById("root"));

root.render(
   // <React.StrictMode>
   <Provider store={store}>
      <BrowserRouter>
         <App />
      </BrowserRouter>
   </Provider>
   //</React.StrictMode>
);
