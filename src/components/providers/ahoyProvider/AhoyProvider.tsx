"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type AhoyContext = {
  ahoy: any;
};

export const AhoyContext = createContext({
  ahoy: undefined,
} as AhoyContext);

export function useAhoy() {
  return useContext(AhoyContext);
}

export function AhoyProvider(props: { children: JSX.Element }) {

  const [ahoyLoaded, setAhoy] = useState<any>(undefined);

  const ahoyConfigured = async () => {
    const ahoyConfigured = (await import('ahoy.js')).default
    ahoyConfigured.configure({
      visitsUrl: `http://localhost:3000/ahoy/visits`,
      eventsUrl: `http://localhost:3000/ahoy/events`,
      trackVisits: true,
    })
    setAhoy(ahoyConfigured);
  }
  

  useEffect( () => {
    ahoyConfigured();
  }, [])

  return (
    <AhoyContext.Provider
      value={{
        ahoy: ahoyLoaded,
      }}
    >
      {props.children}
    </AhoyContext.Provider>
  );
}

export default AhoyContext;
