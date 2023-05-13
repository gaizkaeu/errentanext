"use client";

import { SearchBar, SearchBarContainer, TextFilter } from "@/components/filters";
import { LocationFilter } from "@/components/filters/location-filter";
import { MultipleSelectFilter } from "@/components/filters/multiple-select-filter";
import { useSearch } from "@/lib/utils";
import { Tag } from "@/store/types/Tag";

export const OrganizationExplore = (props: {skills: Tag[]}) => {
  const [s, setS] = useSearch(true); 


  return (
    <SearchBar searchParams={s} setSearchParams={setS}>
      <SearchBarContainer>
        <TextFilter key_name="name" title="Nombre" />
        <LocationFilter key_name="q[coordinates]" key_extra="q[coordinates_extra]" title="Cerca de" />
        <MultipleSelectFilter key_name="q[price_range_in]" title="Rango de precio" keys={[{label: '€', value: '1'}, {label: '€€', value: '2'}, {label: '€€€', value: '3'}]} />
        <MultipleSelectFilter key_name="q[avg_rating_gt]" title="Rating" keys={[{label: 'Mayor que 1', value: '1'}, {label: 'Mayor que 2', value: '2'}, {label: 'Mayor que 3', value: '3'}, {label: 'Mayor que 4', value: '4'}]} />
        <MultipleSelectFilter key_name="q[skills_id_in]" title="Skills" keys={props.skills.map((d) => ({label: d.attributes.name, value: d.id}))} />
      </SearchBarContainer>
    </SearchBar>
  );
}

