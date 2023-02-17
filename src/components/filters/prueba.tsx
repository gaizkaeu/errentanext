"use client";
import { useState } from "react";
import { SearchBar } from ".";
import { TextFilter } from "./TextFilter";

export const Prueba = () => {
  const [search, setSearch] = useState({});
  
  return (
    <SearchBar searchParams={search} setSearchParams={setSearch}>
      <TextFilter key_name="name" key="name" title={"prueba"} />
    </SearchBar>
  );
}