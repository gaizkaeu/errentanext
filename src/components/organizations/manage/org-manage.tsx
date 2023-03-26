"use client";
import { useGetOrganizationsManageQuery } from "@/store/endpoints/organizations"
import { OrganizationCard } from "../org-card";
import { Link } from "next-intl";
import { Button } from "@/components/ui/button";
import { OrganizationManageBadgeRoles } from "./org-manage-roles-badges";

export const OrganizationManageList = () => {

  const { data } = useGetOrganizationsManageQuery({});

  return (
    <div className="grid grid-cols-1 gap-4">
      {data && data.map((org) => (
        <Link href={`/organization-manage/${org.attributes.organization.data.id}`} key={org.id} className="w-full lg:max-w-lg">
          <OrganizationCard org={org.attributes.organization.data} badges={<OrganizationManageBadgeRoles role={org.attributes.role} />} />
        </Link>
      ))}
      {data && data.length == 0 && <OrganizationManageListEmpty />}
    </div>
  )
}

const OrganizationManageListEmpty = () => {

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <p className="text-2xl font-bold">No tienes ninguna <span className="font-light">organización</span>.</p>
      <Link href="/organization/onboarding" className="mt-4">
        <Button color="primary">¿Por qué inscribirse en ERRENTA?</Button>
      </Link>
    </div>
  )
}