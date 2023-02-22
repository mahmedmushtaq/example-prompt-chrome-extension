import React from "react";
import { createRoot } from "react-dom/client";
import ContentScript from "./ContentScript";
import "../assets/tailwind.css";

window.onload = async () => {
  function init() {
    const textAreaEl = document.querySelector("[data-id^='root']");
    if (!textAreaEl) {
      return console.log(
        "unable to locate textarea. Please consult to admin for this case"
      );
    }

    const appContainer = document.createElement("div");
    textAreaEl.parentElement.style.position = "relative";
    textAreaEl.parentElement.appendChild(appContainer);

    const root = createRoot(appContainer);

    root.render(<ContentScript />);
  }

  init();
};
