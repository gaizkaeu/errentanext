"use client";
import { BaseTooltip, SearchContext, TooltipContentBase } from ".";
import { useContext } from "react";
import debounce from "lodash/debounce";
import { Input } from "../ui/input";

export const TextFilter = (props: { title: string; key_name: string }) => {
  const { searchParams } = useContext(SearchContext);

  return (
    <BaseTooltip title={props.title} active={props.key_name in searchParams}>
      <TextConfiguration {...props} />
    </BaseTooltip>
  );
};

export const TextConfiguration = (props: {
  title: string;
  key_name: string;
}) => {
  const { searchParams, setSearchParams } = useContext(SearchContext);

  const updateSearchValue = debounce((value: string) => {
    if (value === "") {
      clear();
      return;
    }
    setSearchParams({
      ...searchParams,
      [props.key_name]: value,
    });
  }, 500);

  const clear = () => {
    setSearchParams((current: any) => {
      const cp = { ...current };
      delete cp[props.key_name];
      return cp;
    });
  };

  return (
    <TooltipContentBase title={props.title}>
      <Input
        defaultValue={searchParams[props.key_name]}
        onChange={(e: any) => {
          updateSearchValue(e.target.value);
        }}
      ></Input>
    </TooltipContentBase>
  );
};
