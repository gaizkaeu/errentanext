"use client";
import { Button } from "@/components/ui/button";
import { Organization } from "@/store/types/Organization";
import { GlobeEuropeAfricaIcon, PhoneIcon, MapPinIcon } from "@heroicons/react/24/outline";
import { OrganizationCalculateButton } from "./org-calculate-button";

import { useAhoy } from "@/components/providers";
export const OrganizationActionsSmall = (props: { org: Organization }) => {

  const { org } = props;

  const { ahoy } = useAhoy();

  return (

    <div className="flex gap-4 place-content-center">
      <OrganizationCalculateButton org={org} size="small" />
      <a href={`tel:${org.attributes.phone}`} onClick={() => ahoy.track("org_call", {org_id: props.org.id})}>
        <Button variant="subtle">
          <span className="sr-only">Llamar a {org.attributes.name}</span>
          <PhoneIcon className="h-6" />
        </Button>
      </a>
      <a href={`tel:${org.attributes.phone}`} onClick={() => ahoy.track("org_directions", {org_id: props.org.id})}>
        <Button variant="subtle">
          <span className="sr-only">Ir a {org.attributes.name}</span>
          <MapPinIcon className="h-6" />
        </Button>
      </a>
      <a href={`tel:${org.attributes.phone}`} onClick={() => ahoy.track("org_website", {org_id: props.org.id})}>
        <Button variant="subtle">
          <span className="sr-only">Ir a {org.attributes.name}</span>
          <GlobeEuropeAfricaIcon className="h-6" />
        </Button>
      </a>
    </div>
  )
}