"use client";
import { Status, Wrapper } from "@googlemaps/react-wrapper";
import { Children, cloneElement, isValidElement, useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";

const render = (status: Status) => {
  if (status === Status.FAILURE) {
    return <p>failed</p>;
  }
  return <p>loading...</p>;
};

interface GoogleMapProps {
  children?: JSX.Element[] | JSX.Element;
  center?: google.maps.LatLngLiteral;
  bounds?: google.maps.LatLngBoundsLiteral;
  zoom?: number;
  setCenter?: (center: google.maps.LatLngLiteral) => void;
  setBounds?: (bounds: google.maps.LatLngBoundsLiteral) => void;
  setZoom?: (zoom: number) => void;
}

export function GoogleMap(props: GoogleMapProps) {

  return (
    <Wrapper apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API ?? ''} render={render}>
      <Map {...props}>
        {props.children}
      </Map>
    </Wrapper>
  );
}

export function Map({ children, center, setCenter, setBounds, bounds, setZoom, zoom}: GoogleMapProps) {
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
      center: center,
      zoom: zoom,
    });
    setMap(mapinstance);

    mapinstance.addListener("dragend", () => {
      const center = mapinstance.getCenter();
      setCenter?.({lat: center?.lat() ?? 0, lng: center?.lng() ?? 0});
      const bounds = mapinstance.getBounds();
      setBounds?.({south: bounds?.getSouthWest()?.lat() ?? 0, west: bounds?.getSouthWest()?.lng() ?? 0, north: bounds?.getNorthEast()?.lat() ?? 0, east: bounds?.getNorthEast()?.lng() ?? 0});
    });
    mapinstance.addListener("zoom_changed", () => {
      const bounds = mapinstance.getBounds();
      setBounds?.({south: bounds?.getSouthWest()?.lat() ?? 0, west: bounds?.getSouthWest()?.lng() ?? 0, north: bounds?.getNorthEast()?.lat() ?? 0, east: bounds?.getNorthEast()?.lng() ?? 0});
    });
  }, [s]);



  return (
    <>
      <div id="map" className="h-full z-0" ref={googlemap}>
        {Children.map(children, (child) => {
          if (isValidElement(child)) {
            return cloneElement(child as any, { map: map });
          }
        })}

      </div>
    </>
  );
}