"use client";

import { useGetTaxIncomesQuery } from "@/store/endpoints/taxIncomes";
import { TaxIncomeCard } from "../tax-card";
import { SearchBar } from "@/components/filters";
import { useState } from "react";
import { TextFilter } from "@/components/filters/text-filter";
import { OrganizationFilter } from "@/components/organizations/filters";

const IndexTaxIncomes = () => {

  const [search, setSearch] = useState({});
  const { data } = useGetTaxIncomesQuery(search);

  return (
    <>
      <SearchBar searchParams={search} setSearchParams={setSearch} >
        <TextFilter key="name" key_name="Abogado" title="Abogado" />
        <OrganizationFilter key_name="organization_id" key="organization_id" title="Asesoria" />
      </SearchBar>
      <div className="space-y-3 mt-3">
        {data && data.map((tax) => (
          <TaxIncomeCard key={tax.id} tax={tax} />
        ))}
      </div>

    </>
  );
};

export { IndexTaxIncomes }