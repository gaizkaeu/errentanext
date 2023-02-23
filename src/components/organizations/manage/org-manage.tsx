"use client";
import { useGetOrganizationsManageQuery } from "@/store/endpoints/organizations"
import { OrganizationCard } from "../org-card";
import { Link } from "next-intl";

export const OrganizationManageList = () => {

  const { data } = useGetOrganizationsManageQuery({});

  return (
    <div>
      {data && data.map((org) => (
        <Link href={`/organization-manage/${org.id}`} key={org.id} className="w-full lg:max-w-lg">
          <OrganizationCard org={org} />
        </Link>
      ))}
    </div>
  )

}