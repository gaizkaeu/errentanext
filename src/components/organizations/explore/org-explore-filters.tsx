"use client";

import { SearchBar, TextFilter } from "@/components/filters";
import { MultipleSelectFilter } from "@/components/filters/multiple-select-filter";
import { useSearch } from "@/lib/utils";
import { useGetSkillsTagsQuery } from "@/store/endpoints/organizations";

export const OrganizationExplore = () => {
  const [s, setS] = useSearch(true); 

  const { data } = useGetSkillsTagsQuery({});

  return (
    <SearchBar searchParams={s} setSearchParams={setS}>
      <TextFilter key_name="name" title="Nombre" />
      <MultipleSelectFilter key_name="q[price_range_in]" title="Rango de precio" keys={[{label: '€', value: '1'}, {label: '€€', value: '2'}, {label: '€€€', value: '3'}]} />
      <MultipleSelectFilter key_name="q[avg_rating_gt]" title="Rating" keys={[{label: 'Mayor que 1', value: '1'}, {label: 'Mayor que 2', value: '2'}, {label: 'Mayor que 3', value: '3'}, {label: 'Mayor que 4', value: '4'}]} />
      {data ? (
        <MultipleSelectFilter key_name="q[skills_id_in]" title="Skills" keys={data.map((d) => ({label: d.attributes.name, value: d.id}))} />
      ) : <></>}
    </SearchBar>
  );
}

