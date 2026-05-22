import React from "react";
import ReactDOM from "react-dom/client";
import { Analytics } from "@vercel/analytics/react";
import App from "./App.jsx";
import { initClarity, protectClaritySensitiveFields } from "./clarity.js";
import "./index.css";
import "./lumi-home-final.css";

protectClaritySensitiveFields();
initClarity();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
    <Analytics />
  </React.StrictMode>
);
