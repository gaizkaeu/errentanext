"use client";
import { SearchBar } from "@/components/filters";
import { TextFilter } from "@/components/filters/TextFilter";
import { useGetOrganizationsQuery } from "@/store/api"
import { useState } from "react";
import { OrganizationCard } from "../Card";
import { LocationFilter } from "@/components/filters/LocationFilter";

export const OrganizationExplore = () => {
  const [search, setSearch] = useState({});
  const { data } = useGetOrganizationsQuery(search);

  return (
    <div className="space-y-3">
      <SearchBar searchParams={search} setSearchParams={setSearch}>
        <TextFilter key_name="name" key="name" title={"Buscar por nombre"} />
        <LocationFilter />
      </SearchBar>
      <div className="grid grid-cols-1 gap-4">
        {data && data?.map((org) => (
          <OrganizationCard key={org.id} org={org} />
        ))}
      </div>
    </div>
  );
}
