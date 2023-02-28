"use client";
import { useTheme } from "next-themes";
import {
  Children,
  cloneElement,
  isValidElement,
  useEffect,
  useRef,
  useState,
} from "react";

export function Map({ children }: { children?: JSX.Element[] }) {
  const googlemap = useRef(null);
  const [map, setMap] = useState<google.maps.Map>();
  const s = useTheme();


  useEffect(() => {
    if (!googlemap.current) return;
    let mapinstance = new google.maps.Map(googlemap.current, {
      disableDoubleClickZoom: false,
      gestureHandling: 'greedy',
      mapId: s.theme == "dark" ? "5d1dd36635803eed" : "d4895c37d1e0542d",
      disableDefaultUI: true,
      center:
      {
        lat: 40.416775,
        lng: -3.703790
      },
      zoom: 10,
    });
    setMap(mapinstance);
  }, [s]);

  return (
    <>
      <div id="map" className="h-screen z-0" ref={googlemap}>
        {Children.map(children, (child) => {
          if (isValidElement(child)) {
            return cloneElement(child as any, { map: map });
          }
        })}

      </div>
    </>
  );
}