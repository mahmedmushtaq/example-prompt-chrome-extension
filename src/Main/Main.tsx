import React, { useCallback, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { getAllCategories } from "../firebase/db/categories";

const Popup = () => {
  const [enable, setEnable] = useState(true);

  return (
    <div className="text-center">
      <h1 className="text-2xl text-white bg-primary p-3 font-lexend">
        exampleprompts.com
      </h1>
      <h2 className="text-xl text-secondary py-2 font-lexend font-bold">
        ChatGpt prompts
      </h2>

      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={enable}
          className="sr-only peer"
          onChange={(e) => {
            setEnable(e.target.checked);
          }}
        />
        <div className="w-11 h-6 bg-primary rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-primary after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
        <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300 font-montSerrat">
          Enable
        </span>
      </label>

      <p className="p-2 font-montSerrat">
        By enabling this, you are allowing the extension to help you to write
        ChatGpt prompts
      </p>
    </div>
  );
};

export default Popup;
