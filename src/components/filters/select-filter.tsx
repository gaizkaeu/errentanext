"use client";
import { useContext, useEffect } from "react";
import { BaseTooltip, SearchContext, TooltipContentBase } from ".";
import { Check, LucideIcon } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "../ui/command";
import { cn } from "@/lib/utils";

export interface Key {
  label: string;
  value: string;
  icon?: LucideIcon;
}


export const SelectFilter = (props: {
  title: string;
  key_name: string;
  keys: Key[];
}) => {
  const { searchParams, setSearchParams } = useContext(SearchContext);

  const setSelected = (value: string | undefined) => {
    if (value === undefined) {
      const { [props.key_name]: _, ...rest } = searchParams;
      setSearchParams(rest);
      return;
    }
    setSearchParams({[props.key_name]: value });
  };

  return (
    <BaseTooltip title={props.title} active={props.key_name in searchParams} selectedValues={props.keys.filter((d) => searchParams[props.key_name]?.includes(d.value)).map((d) => d.label)}>
      <SelectConfiguration {...props} selected={searchParams[props.key_name] as string | undefined} setSelected={setSelected} />
    </BaseTooltip>
  );
};

export const SelectConfiguration = (props: {
  title: string;
  key_name: string;
  keys: Key[];
  selected: string | undefined;
  setSelected: (value: string | undefined) => void;
}) => {

  const { selected, setSelected } = props;


  return (
    <TooltipContentBase title={props.title}>
      <div>
      <Command>
          <CommandInput placeholder={props.title} />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {props.keys.map((option) => {
                const isSelected = selected === option.value;
                return (
                  <CommandItem
                    key={`${props.title}-option-${option.value}`}
                    onSelect={() => {
                        setSelected(option.value);
                      }
                    }
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
                    {option.icon && (
                      <option.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                    )}
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
            {selected && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={() => setSelected(undefined)}
                    className="justify-center text-center"
                  >
                    Clear filters
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </div>
    </TooltipContentBase>
  );
};
