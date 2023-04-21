"use client";
import { GoogleMap } from "@/components/map"
import { Organization } from "@/store/types/Organization"
import { OrganizationMarker } from "../map"
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useKeepSearchParams } from "@/lib/utils";
import { debounce } from "lodash";

export const MapComponent = (props: { orgs: Organization[] }) => {

  const s = useSearchParams();
  const g = useKeepSearchParams();
  const r = useRouter();

  const didMount = useRef(false);

  //madrid bounds
  const [bounds, setBounds] = useState({
    east: s.get('bounds[east]') ? parseFloat(s.get('bounds[east]') as string) : 3.1827108836364992,
    north: s.get('bounds[north]') ? parseFloat(s.get('bounds[north]') as string) : 44.86676249091002,
    south: s.get('bounds[south]') ? parseFloat(s.get('bounds[south]') as string) : 34.9223736323199,
    west: s.get('bounds[west]') ? parseFloat(s.get('bounds[west]') as string) : -9.40462867150571
  })

  const [center, setCenter] = useState({
    lat: s.get('center[lat]') ? parseFloat(s.get('center[lat]') as string) : 40.4167754,
    lng: s.get('center[lng]') ? parseFloat(s.get('center[lng]') as string) : -3.7037902
  })

  const [zoom, setZoom] = useState(s.get('zoom') ? parseFloat(s.get('zoom') as string) : 6)

  const debouncedSetBounds = debounce(setBounds, 1000);
  const debouncedSetCenter = debounce(setCenter, 1000);
  const debouncedSetZoom = debounce(setZoom, 1000);

  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true;
      return;
    }

    window.history.pushState(
      {},
      '',
      window.location.pathname + '?' + g({
        'bounds[east]': bounds.east,
        'bounds[north]': bounds.north,
        'bounds[south]': bounds.south,
        'bounds[west]': bounds.west,
        'center[lat]': center.lat,
        'center[lng]': center.lng,
        'zoom': zoom
      })
    );

  }, [bounds, zoom, center])


  return (
    <div className="h-screen">
      <GoogleMap
        center={center}
        zoom={zoom}
        setZoom={debouncedSetZoom}
        setCenter={debouncedSetCenter}
        setBounds={debouncedSetBounds}
      >
        {props.orgs.map((org) => (
          <OrganizationMarker key={org.id} org={org} selected={s.get('org') == org.id} />
        ))}
      </GoogleMap>
    </div>
  )
}