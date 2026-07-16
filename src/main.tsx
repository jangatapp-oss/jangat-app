import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css";
import "./configuration.css";
import "./professional.css";

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register(`${import.meta.env.BASE_URL}service-worker.js`, {
        scope: import.meta.env.BASE_URL,
      })
      .then((registration) => {
        registration.addEventListener("updatefound", () => {
          const worker = registration.installing;
          worker?.addEventListener("statechange", () => {
            if (worker.state !== "installed" || !navigator.serviceWorker.controller) return;
            const notice = document.createElement("button");
            notice.className = "update-notice";
            notice.textContent = "Une nouvelle version de JÀNGAT est disponible · Actualiser";
            notice.addEventListener("click", () => window.location.reload());
            document.body.appendChild(notice);
          });
        });
      })
      .catch(() => undefined);
  });
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
