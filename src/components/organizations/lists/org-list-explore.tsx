"use client";

import { Link } from "next-intl"
import { OrganizationLineItem } from "../org-line-item"
import { Organization } from "@/store/types/Organization"
import { useAhoy } from "@/components/providers"
import { OrganizationCard } from "../org-card";
import { useKeepSearchParams } from "@/lib/utils";

export const OrganizationListMap = (props: { orgs: Organization[], selected?: string }) => {
  const { ahoy } = useAhoy();
  const s = useKeepSearchParams();

  return (
    <div className='grid grid-cols-1 divide-y border border-t border-b dark:border-slate-700 dark:divide-slate-700'>
      {props.orgs.map((org: Organization) => (
        <Link href={`/organizations/map?${s({ org: org.id })}`} key={org.id} onClick={() => ahoy.track("org_click", { place: "org_list_map", org_id: org.id })}>
          <OrganizationLineItem org={org} selected={props.selected == org.id} />
        </Link>
      ))}
    </div>
  )
}

export const OrganizationList = (props: { orgs: Organization[] }) => {
  const { ahoy } = useAhoy();

  return (
    <div className="grid grid-cols-1 gap-4">
      <Link href={"/organizations/onboarding"} className="text-md lg:text-xl underline">
        Quiero que <span className="font-bold">mi asesoría</span> aparezca aquí.
      </Link>
      {props.orgs.map((org: Organization) => (
        <Link onClick={() => ahoy.track("org_click", { place: "org_list", org_id: org.id })} href={`/organizations/${org.id}`} key={org.id} className="w-full lg:max-w-lg">
          <OrganizationCard org={org} />
        </Link>
      ))}
    </div>
  )
}