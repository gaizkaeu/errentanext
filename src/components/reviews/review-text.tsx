"use client";

import { useState } from "react";

export const ReviewText = (props: { text: string }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  }

  return (
    <p className="text-sm">
      {expanded ? props.text : props.text.substring(0, 100)}
      {props.text.length > 100 && (
        <span className="text-slate-500 dark:text-slate-400 cursor-pointer" onClick={toggleExpanded}>
          {expanded ? " menos" : " más"}
        </span>
      )}
    </p>
  );
}