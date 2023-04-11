"use client";
import { useEffect, useState } from "react";

export const LoadingText = (props: { messages?: string[] }) => {
  const [messageIndex, setMessageIndex] = useState(0);
  const messages = props.messages ?? [
    "Cargando",
    "No deber´ia tardar mucho"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((messageIndex + 1) % messages.length);
    }, 2500);
    return () => clearInterval(interval);
  });

  return (
    <div className="grid h-full place-items-center">
      <div className="grid grid-cols-1 mx-auto">
        <p className="animate-pulse text-xl font-bold">
          {messages[messageIndex]}
        </p>
      </div>
    </div>
  );
};