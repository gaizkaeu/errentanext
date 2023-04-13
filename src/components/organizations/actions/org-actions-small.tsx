"use client";
import { Button } from "@/components/ui/button";
import { Organization } from "@/store/types/Organization";
import { GlobeEuropeAfricaIcon, PhoneIcon, MapPinIcon } from "@heroicons/react/24/outline";

import { useAhoy } from "@/components/providers";

export const OrganizationActionsSmall = (props: { org: Organization }) => {

  const { org } = props;

  const { ahoy } = useAhoy();

  return (
    <div className="flex gap-4 flex-wrap">
      <div className="max-md:w-full flex place-content-center gap-4">
      <a href={`tel:${org.attributes.phone}`} onClick={() => ahoy.track("org_call", {org_id: props.org.id})}>
        <ActionButton label="Llamar">
          <span className="sr-only">Llamar a {org.attributes.name}</span>
          <PhoneIcon className="h-6" />
        </ActionButton>
      </a>
      <a href={`tel:${org.attributes.phone}`} onClick={() => ahoy.track("org_directions", {org_id: props.org.id})}>
        <ActionButton label="Dirección">
          <span className="sr-only">Ir a {org.attributes.name}</span>
          <MapPinIcon className="h-6" />
        </ActionButton>
      </a>
      <a href={`tel:${org.attributes.phone}`} onClick={() => ahoy.track("org_website", {org_id: props.org.id})}>
        <ActionButton label="Página web">
          <span className="sr-only">Ir a {org.attributes.name}</span>
          <GlobeEuropeAfricaIcon className="h-6" />
        </ActionButton>
      </a>
    </div>
    </div>
  )
}

export const ActionButton = (props: { label: string, children: JSX.Element | JSX.Element[]}) => {
  return (
    <>
    <Button variant="ghost" className="rounded-full border border-blue-700 text-blue-800 dark:border-blue-200">
      {props.children}
    </Button>
    <p className="text-xs text-blue-800 text-center dark:text-white">{props.label}</p>
    </>
  )
}

