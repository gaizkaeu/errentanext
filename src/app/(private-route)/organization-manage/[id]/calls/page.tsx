"use client";
import { CallManageComponent } from "@/components/contact";
import { SearchBar, TextFilter } from "@/components/filters";
import { MultipleSelectFilter } from "@/components/filters/multiple-select-filter";
import { useSearch } from "@/lib/utils";
import { useGetCallsManageQuery } from "@/store/endpoints/calls";


export default function Page({ params }: { params: { id: string } }) {

  const [s, setS] = useSearch(false, { 'q[successful_in]': [false] }); 
  const { data } = useGetCallsManageQuery({ org_id: params.id, filters: s })

  return (
    <div className="w-full">
      <SearchBar searchParams={s} setSearchParams={setS}>
        <TextFilter key_name="name" title="nombre" />
        <MultipleSelectFilter key_name="q[successful_in]" title="Estado" keys={[{label: 'realizada', value: 'true'}, {label: 'pendiente', value: 'false'}]} />
      </SearchBar>
      {data?.map((call) => (
        <CallManageComponent key={call.id} call={call} />
      ))}
    </div>
  );
}