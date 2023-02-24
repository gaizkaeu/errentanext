"use client";
import { PlusCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { createContext } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

export { TextFilter } from "./text-filter";
export { LocationFilter } from "./location-filter";

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
        <div className="flex-1 flex flex-wrap gap-y-2">{props.children}</div>
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
  return (
    <Popover>
      <PopoverTrigger asChild>
      <div className="flex text-md font-medium mr-2 px-2 py-2 border border-gray-400 p-8 rounded-xl border-dashed gap-2 items-center">
        {props.active ? (
          <span className="flex w-3 h-3 bg-green-600 rounded-full"></span>
        ) : (
          <PlusCircleIcon className="w-6 h-6 text-gray-400" />
        )}
        <span>{props.title}</span>
      </div>
    </PopoverTrigger>
      <PopoverContent>
          {props.children}
      </PopoverContent>
    </Popover>
  );
};

export const TooltipContentBase = (props: {
  children: JSX.Element;
  title: string;
}) => {

  return (
    <div>
      <div className="w-full">
        {props.children}
      </div>
    </div>
  );
};
