import { OverlayView } from "@/components/map/overlay";
import { Organization, calculateRating } from "@/store/types/Organization";
interface CustomMarkerProps {
  map?: google.maps.Map;
  org: Organization;
}

export function OrganizationMarker({
  org,
  map,
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
          <div className="bg-white p-2 dark:bg-slate-800 rounded-xl">
            <p className="font-bold">{org.attributes.name} | <span className="text-green-500">{calculateRating(org.attributes.ratings).rating}</span></p>
          </div>
        </OverlayView>
      )}
    </>
  );
}