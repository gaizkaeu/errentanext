"use client";
import { LocationFilter, SearchBar, TextFilter } from "@/components/filters";
import { TagList } from "@/components/tags";
import { useSearch } from "@/lib/utils";


export const OrganizationExplore = () => {
  const [search, setSearch] = useSearch(true);

  return (
    <>
      <SearchBar searchParams={search} setSearchParams={setSearch}>
        <TextFilter key_name="q[name_cont]" title={"Nombre"} />
        <TextFilter key_name="q[price_range]" title={"Rango de precio"} />
        <LocationFilter />
      </SearchBar>
      <TagList />
    </>
  );
}
