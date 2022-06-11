//#region ReactJS
import React from "react";
import ReactDOM from "react-dom/client";
//#endregion

//#region IoT With AI Speacker
import "./scss/style.scss";
import App from "./app";
//#endregion

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
