"use client";
import { PlusCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { createContext, useState } from "react";
import Popover from "../ui/popover-card";

export { TextFilter } from "./text-filter";
// export { LocationFilter } from "./location-filter";

interface SearchContextProps {
  searchParams: any;
  setSearchParams: (newSearchParams: any) => void;
}

export const SearchContext = createContext<SearchContextProps>({
  searchParams: { query_values: {}, ignore_values: {} },
  setSearchParams: (_newSearch: () => void) => {
    return;
  },
});

export const SearchBar = (props: {
  children: JSX.Element[] | JSX.Element;
  searchParams: any;
  setSearchParams: (newSearch: any) => void;
}) => {
  const { searchParams, setSearchParams } = props;

  return (
    <SearchContext.Provider value={{ searchParams, setSearchParams }}>
      <div className="flex items-center">
        <div className="flex-1 flex flex-row overflow-x-auto overflow-y-hidden gap-y-2">{props.children}</div>
        <div>
          <XCircleIcon className="w-6 h-6 text-gray-400" />
        </div>
      </div>
    </SearchContext.Provider>
  );
};

export const BaseTooltip = (props: {
  children: JSX.Element;
  title: string;
  active: boolean;
}) => {

  const [openPopover, setOpenPopover] = useState(false);

  return (
    <Popover content={
      props.children
    }
      openPopover={openPopover}
      setOpenPopover={setOpenPopover}
    >
      <button onClick={() => setOpenPopover(!openPopover)} className="flex text-md font-medium mr-2 px-1 py-1 border border-gray-400 p-8 rounded-xl border-dashed gap-2 items-center">
        {props.active ? (
          <span className="flex w-3 h-3 bg-green-600 rounded-full"></span>
        ) : (
          <PlusCircleIcon className="w-6 h-6 text-gray-400" />
        )}
        <span className="whitespace-nowrap capitalize">{props.title}</span>
      </button>
    </Popover>
  );
};

export const TooltipContentBase = (props: {
  children: JSX.Element;
  title: string;
}) => {

  return (
    <div className="w-full p-2 max-md:h-[calc(100vh_-_7rem)]">
      <p className="text-lg uppercase font-bold max-md:text-2xl">FILTRAR POR <br className="md:hidden" /> <span className="font-light">{props.title}</span></p>
      {props.children}
    </div>
  );
};
