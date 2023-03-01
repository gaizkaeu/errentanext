"use client";
import { GoogleMap } from "@/components/map"
import { Organization } from "@/store/types/Organization"
import { OrganizationMarker } from "../map"
import { useSearchParams } from "next/navigation";

export const MapComponent = (props: { orgs: Organization[] }) => {

  const s = useSearchParams();

  return (
    <GoogleMap>
      {props.orgs.map((org) => (
        <OrganizationMarker key={org.id} org={org} selected={s.get('org') == org.id} />
      ))}
    </GoogleMap>
  )
}