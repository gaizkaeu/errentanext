"use client";

import { SearchBar, TextFilter } from "@/components/filters";
import { useSearch } from "@/lib/utils";

export const OrganizationExplore = () => {
  const [s, setS] = useSearch(true); 

  return (
    <SearchBar searchParams={s} setSearchParams={setS}>
      <TextFilter key_name="name" title="nombre" />
    </SearchBar>
  );
}

