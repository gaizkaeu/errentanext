"use client";

import Link from "next/link"
import { OrganizationLineItem } from "../org-line-item"
import { Organization } from "@/store/types/Organization"
import { useAhoy } from "@/components/providers"
import { OrganizationCard } from "../org-card";
import { useKeepSearchParams } from "@/lib/utils";

export const OrganizationListInline = (props: { orgs: Organization[], place?: string, meta_ind_click?: {[key:string]: string}, selected?: string }) => {
  const { ahoy } = useAhoy();

  const track = (org_id: string) => {

    ahoy?.track("org_click", { 
      place: props.place ?? "org_list",
      org_id: org_id,
      meta: props.meta_ind_click 
    })

    return undefined;
  }

  return (
    <div className='grid grid-cols-1 divide-y  dark:border-slate-700 dark:divide-slate-700'>
      {props.orgs.map((org: Organization) => (
        <Link href={`/organizations/${org.id}`} key={org.id} onClick={() => track(org.id)}>
          <OrganizationLineItem org={org} selected={props.selected == org.id} />
        </Link>
      ))}
    </div>
  )
}

export const OrganizationListMap = (props: { orgs: Organization[], place?: string, meta_ind_click?: {[key:string]: string}, selected?: string }) => {
  const { ahoy } = useAhoy();
  const s = useKeepSearchParams();

  const track = (org_id: string) => {

    ahoy?.track("org_click", { 
      place: props.place ?? "org_list",
      org_id: org_id,
      meta: props.meta_ind_click 
    })

    return undefined;
  }

  return (
    <div className='grid grid-cols-1 divide-y  dark:border-slate-700 dark:divide-slate-700'>
      {props.orgs.map((org: Organization) => (
        <Link href={`/organizations/map?${s({ org: org.id })}`} key={org.id} onClick={track(org.id)}>
          <OrganizationLineItem org={org} selected={props.selected == org.id} />
        </Link>
      ))}
    </div>
  )
}

export const OrganizationList = (props: { orgs: Organization[], place?: string }) => {
  const { ahoy } = useAhoy();

  return (
    <div className="grid grid-cols-1 gap-4">
      <Link href={"/organizations/onboarding"} className="text-md lg:text-xl underline">
        Quiero que <span className="font-bold">mi asesoría</span> aparezca aquí.
      </Link>
      {props.orgs.map((org: Organization) => (
        <Link onClick={() => ahoy.track("org_click", { place: props.place ?? "org_list" , org_id: org.id })} href={`/organizations/${org.id}`} key={org.id} className="w-full">
          <OrganizationCard org={org} />
        </Link>
      ))}
    </div>
  )
}