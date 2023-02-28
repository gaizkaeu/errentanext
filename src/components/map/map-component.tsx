"use client";
import { Status, Wrapper } from "@googlemaps/react-wrapper";
import { Map } from "./map"

const render = (status: Status) => {
  if (status === Status.FAILURE) {
    return <p>failed</p>;
  }
  return <p>loading...</p>;
};

interface GoogleMapProps {
  children?: JSX.Element[];
}

export function GoogleMap({
  children
}: GoogleMapProps) {

  return (
    <Wrapper apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API ?? ''} render={render}>
      <Map>
        {children}
      </Map>
    </Wrapper>
  );
}