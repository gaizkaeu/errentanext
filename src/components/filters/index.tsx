"use client";
import { PlusCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { createContext, useState } from "react";
import Popover from "../ui/popover-card";
import { Button } from "../ui/button";
import { PlusCircle } from "lucide-react";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";

export { TextFilter } from "./text-filter";

interface SearchContextProps {
  searchParams: 
  {
    [key: string]: string | string[] | undefined;
  };
  setSearchParams: (newSearchParams: {
    [key: string]: string | string[] | undefined;
  }) => void;
}

export const SearchContext = createContext<SearchContextProps>({
  searchParams: { },
  setSearchParams: (_newSearch) => {
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
        <div className="flex-1 flex flex-row overflow-x-auto overflow-y-hidden gap-y-2 space-x-1">{props.children}</div>
        <Button variant="ghost" onClick={() => setSearchParams({})}>
          <XCircleIcon className="w-6 h-6 text-gray-400" />
        </Button>
      </div>
    </SearchContext.Provider>
  );
};

export const BaseTooltip = (props: {
  children: JSX.Element;
  title: string;
  active: boolean;
  selectedValues?: string | string[];
}) => {

  const { selectedValues } = props;

  const [openPopover, setOpenPopover] = useState(false);

  return (
    <Popover content={
      props.children
    }
      openPopover={openPopover}
      setOpenPopover={setOpenPopover}
    >
      <Button variant="outline" size="sm" className="h-8 border-dashed whitespace-nowrap" onClick={() => setOpenPopover(!openPopover)}>
        <PlusCircle className="mr-2 h-4 w-4" />
        {props.title}
        {typeof selectedValues === "string" && (
          <Badge
            variant="secondary"
            className="rounded-sm px-1 font-normal ml-3"
          >
            {selectedValues}
          </Badge>
        )}
        {typeof selectedValues === "object" && selectedValues.length > 0 && (
          <>
            <Separator orientation="vertical" className="mx-2 h-4" />
            <div className="space-x-1 xl:flex">
              {selectedValues.length > 2 ? (
                <Badge
                  variant="secondary"
                  className="rounded-sm px-1 font-normal"
                >
                  {selectedValues.length} selected
                </Badge>
              ) : (
                selectedValues
                  .map((option) => (
                    <Badge
                      variant="secondary"
                      key={option}
                      className="rounded-sm px-1 font-normal"
                    >
                      {option}
                    </Badge>
                  ))
              )}
            </div>
          </>
        )}
      </Button>
    </Popover>
  );
};

export const TooltipContentBase = (props: {
  children: JSX.Element;
  title: string;
}) => {

  return (
    <div className="w-full p-2 max-md:h-90vh">
      {props.children}
    </div>
  );
};
