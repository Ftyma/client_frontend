import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css"; //icons
import "primeflex/primeflex.css";

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
