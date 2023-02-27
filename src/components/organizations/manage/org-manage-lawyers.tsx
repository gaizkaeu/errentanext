"use client";
import { SearchBar } from "@/components/filters";
import { LawOrgStatusFilter, LawyerProfileTable, LawyerStatusFilter } from "@/components/lawyer-profiles";
import { useGetOrganizationLawyersQuery } from "@/store/endpoints/organizations"
import { useState } from "react";

export const OrganizationManageLawyers = (props: {org_id: string}) => {

  const [search, setSearch] = useState({});
  const { currentData } = useGetOrganizationLawyersQuery({ id: props.org_id, filters: search });


  return (
    <div className="grid grid-cols-1 gap-4">
      <SearchBar setSearchParams={setSearch} searchParams={search} >
        <LawOrgStatusFilter />
        <LawyerStatusFilter />
      </SearchBar>
      {currentData && (
        <LawyerProfileTable lawyers={currentData} org_id={props.org_id} />
      )}
    </div>


  )
}