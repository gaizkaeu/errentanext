"use client";
import { SearchBar } from "@/components/filters";
import { TextFilter } from "@/components/filters/TextFilter";
import { useState } from "react";
import { LocationFilter } from "@/components/filters/LocationFilter";
import { useRouter} from "next/navigation";

export const OrganizationExplore = (props: {initial: any}) => {
  const [search, setSearch] = useState(props.initial);
  const r = useRouter();

  return (
    <div className="space-y-3">
      <SearchBar searchParams={search} setSearchParams={setSearch}>
        <TextFilter key_name="name" key="name" title={"Buscar por nombre"} />
        <LocationFilter />
      </SearchBar>
    </div>
  );
}
