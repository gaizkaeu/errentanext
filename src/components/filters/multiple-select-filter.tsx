"use client";
import { useContext } from "react";
import Select, { MultiValue } from "react-select";
import { BaseTooltip, SearchContext, TooltipContentBase } from ".";
import { Key } from "./select-filter";
import { Button } from "../ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "../ui/command";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

export const MultipleSelectFilter = (props: {
  title: string;
  key_name: string;
  keys: Key[];
}) => {
  const { searchParams } = useContext(SearchContext);

  return (
    <BaseTooltip title={props.title} active={props.key_name in searchParams}>
      <SelectConfiguration {...props} />
    </BaseTooltip>
  );
};

export const SelectConfiguration = (props: {
  title: string;
  key_name: string;
  keys: Key[];
}) => {
  const { searchParams, setSearchParams } = useContext(SearchContext);

  const updateSearchValue = (value: MultiValue<Key>) => {
    if (value == null) {
      clear();
      return;
    }
    setSearchParams({
      ...searchParams,
      [props.key_name]: value.map((d) => d.value),
    });
  };

  const clear = () => {
    setSearchParams((current: any) => {
      const cp = { ...current };
      delete cp[props.key_name];
      return cp;
    });
  };

  return (
    <TooltipContentBase title={props.title}>
      <div>
      <Command>
          <CommandInput placeholder={props.title} />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {props.keys.map((option) => {
                const isSelected = searchParams[props.key_name]?.includes(option.value);
                return (
                  <CommandItem
                    key={option.value}
                    onSelect={() => {
                      if (isSelected) {

                      } else {
                        searchParams[props.key_name] = [...searchParams[props.key_name], option.value];
                      }
                    }}
                  >
                    <div
                      className={cn(
                        "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary dark:border-white",
                        isSelected
                          ? "bg-primary text-primary-foreground"
                          : "opacity-50 [&_svg]:invisible"
                      )}
                    >
                      <Check className={cn("h-4 w-4")} />
                    </div>
                    {/* {option.icon && (
                      <option.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                    )} */}
                    <span>{option.label}</span>
                    {/* {facets?.get(option.value) && (
                      <span className="ml-auto flex h-4 w-4 items-center justify-center font-mono text-xs">
                        {facets.get(option.value)}
                      </span> */}
                    {/* )} */}
                  </CommandItem>
                )
              })}
            </CommandGroup>
            {searchParams.size > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={() => {}}
                    className="justify-center text-center"
                  >
                    Clear filters
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
        {props.key_name in searchParams && (
          <Button onClick={clear} size="sm" color="error">
            Deshabilitar
          </Button>
        )}
      </div>
    </TooltipContentBase>
  );
};
