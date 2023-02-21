import React from "react";
import { ISvgProps } from "./types";
const ChevronRight = ({ width = 24, height = 24,onClick }: ISvgProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      onClick={onClick}
    >
      <polyline points="9 18 15 12 9 6"></polyline>
    </svg>
  );
};

export default ChevronRight;
