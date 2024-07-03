import "@fontsource-variable/inter-tight";
import "@fontsource-variable/sora";
import React from "react";
import ReactDOM from "react-dom/client";

import App from "./app";
import "./styles/tailwind.css";

const rootElement = document.querySelector("#root") as Element;

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
