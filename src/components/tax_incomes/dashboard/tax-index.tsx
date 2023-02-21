"use client";

import { useGetTaxIncomesQuery } from "@/store/endpoints/taxIncomes";
import { TaxIncomeCard } from "../tax-card";
import { SearchBar } from "@/components/filters";
import { useState } from "react";
import { TextFilter } from "@/components/filters/TextFilter";

const IndexTaxIncomes = () => {

  const [search, setSearch] = useState({});
  const { data } = useGetTaxIncomesQuery({});

  return (
    <>
      <SearchBar searchParams={search} setSearchParams={setSearch} >
        <TextFilter key="name" key_name="abogado" title="abogado" />
      </SearchBar>
      <div className="space-y-3 mt-3">
        <p className="text-3xl font-bold leading-tight tracking-tighter md:text-4xl lg:text-5xl lg:leading-[1.1]">
          <span className='font-light'>2020</span>.
        </p>
        {data && data.map((tax) => (
          <TaxIncomeCard key={tax.id} tax={tax} />
        ))}
      </div>

    </>
  );
};

export { IndexTaxIncomes }