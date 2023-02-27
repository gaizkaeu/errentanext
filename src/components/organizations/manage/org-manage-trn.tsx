"use client";
import { SearchBar } from "@/components/filters";
import { TransactionStatusFilter, TransactionTable } from "@/components/transactions";
import { useGetOrganizationTransactionsQuery } from "@/store/endpoints/organizations"
import { useState } from "react";

export const OrganizationManageTransactions = (props: {org_id: string}) => {

  const [search, setSearch] = useState({});
  const { currentData } = useGetOrganizationTransactionsQuery({ id: props.org_id, filters: search });


  return (
    <div className="grid grid-cols-1 gap-4">
      <SearchBar setSearchParams={setSearch} searchParams={search} >
        <TransactionStatusFilter /> 
      </SearchBar>
      {currentData && (
        <TransactionTable transactions={currentData} />
      )}
    </div>


  )
}