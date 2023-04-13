"use client";

import { useGetOrganizationsQuery } from "@/store/api";
import { Organization } from "@/store/types/Organization";
import { OrganizationListInline } from "../lists/org-list-explore";

export const OrganizationExploreOthers = (props: { org: Organization }) => {

  const { data } = useGetOrganizationsQuery({
    'coordinates[latitude]': props.org.attributes.latitude,
    'coordinates[longitude]': props.org.attributes.longitude,
  });


  return (
    <div>
      <p className="text-2xl font-bold leading-tight tracking-tighter">
        Asesorías similares.
      </p>
      <OrganizationListInline orgs={data ?? []} place="recommendation" meta_ind_click={
        {
          "org_id": props.org.id,
        }
      } />
    </div>
  )

}