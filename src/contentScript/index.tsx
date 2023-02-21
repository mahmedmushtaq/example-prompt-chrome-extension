import React from "react";
import { createRoot } from "react-dom/client";
import ContentScript from "./ContentScript";
import "../assets/tailwind.css";

// window.onload = () => {
//   console.log("chat openai loaded");

//   const el = document.querySelector("[data-id^='root']");
//   if (!el) return console.log("unable to locate textarea");

//   const headerDiv = document.createElement("div"); // Create a <div> element
//   headerDiv.innerHTML = "SHOULD BE ON TOP"; // Insert instructions
//   headerDiv.style.width = el.getBoundingClientRect().width + "px";
//   headerDiv.style.background = "red";
//   headerDiv.style.color = "white";
//   headerDiv.style.position = "absolute";
//   headerDiv.style.top = "-30px";
//   el.parentElement.style.position = "relative";

//   // add header on top
//   el.parentNode.insertBefore(headerDiv, el);
// };

window.onload = () => {
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
