"use client";
import { LocationFilter, SearchBar, TextFilter } from "@/components/filters";
import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams} from "next/navigation";
import queryString from "query-string";


export const OrganizationExplore = () => {
  const s = useSearchParams();
  const didMount = useRef(false);
  const [search, setSearch] = useState(queryString.parse(s.toString()));
  const r = useRouter();

  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true;
      return;
    }
    r.push(window.location.pathname + "?" + queryString.stringify(search));
  }, [search]);

  return (
    <div className="space-y-3">
      <SearchBar searchParams={search} setSearchParams={setSearch}>
        <TextFilter key_name="name" key="name" title={"Buscar por nombre"} />
        <LocationFilter />
      </SearchBar>
    </div>
  );
}
