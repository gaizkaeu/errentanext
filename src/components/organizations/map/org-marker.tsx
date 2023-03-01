import { OverlayView } from "@/components/map/overlay";
import { Organization, calculateRating } from "@/store/types/Organization";
import { PriceRange } from "../org-card";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
interface CustomMarkerProps {
  map?: google.maps.Map;
  selected: boolean;
  org: Organization;
}

const orgMarker = cva(
  "rounded-xl p-2",
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
          <div className={cn(orgMarker({ status: selected ? "active" : "disable" }))}>
            <p className="font-bold">{org.attributes.name} | <span className="text-green-500"><PriceRange range={org.attributes.price_range} /></span></p>
          </div>
        </OverlayView>
      )}
    </>
  );
}