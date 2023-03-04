"use client";
import { OverlayView } from "@/components/map/overlay";
import { Organization } from "@/store/types/Organization";
import { PriceRange } from "../org-card";
import { cva } from "class-variance-authority";
import { cn, useKeepSearchParams } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Link } from "next-intl";
import { useAhoy } from "@/components/providers";

interface CustomMarkerProps {
  map?: google.maps.Map;
  selected: boolean;
  org: Organization;
}

const orgMarker = cva(
  "rounded-xl",
  {
    variants: {
      status: {
        disable:
          "bg-white dark:bg-slate-800",
        active:
          "bg-slate-100 dark:bg-slate-600",
      },
    },
    defaultVariants: {
      status: "disable",
    },
  }
)


export function OrganizationMarker({
  org,
  map,
  selected
}: CustomMarkerProps) {

  const g = useKeepSearchParams();
  const { ahoy } = useAhoy();

  return (
    <>
      {map && (
        <OverlayView
          position={{
            lat: org.attributes.latitude,
            lng: org.attributes.longitude
          }}
          map={map}
        >
          <Link href={`/organizations/map?${g({org: org.id})}`} onClick={() => ahoy.track("org_click", {place: "org_map_marker", org_id: org.id})}>
          <Button variant="ghost"className={cn(orgMarker({ status: selected ? "active" : "disable" }))}>
            <p className="font-bold">{org.attributes.name} | <span className="text-green-500"><PriceRange range={org.attributes.price_range} /></span></p>
          </Button>
          </Link>
        </OverlayView>
      )}
    </>
  );
}