"use client";
import { GoogleMap } from "@/components/map"
import { Organization } from "@/store/types/Organization"
import { OrganizationMarker } from "../map"

export const MapComponent = (props: { orgs: Organization[] }) => {
  return (
    <GoogleMap>
      {props.orgs.map((org) => (
        <OrganizationMarker key={org.id} org={org} />
      ))}
    </GoogleMap>
  )
}