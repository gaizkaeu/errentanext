import { useContext } from "react";
import Select from "react-select";
import { BaseTooltip, SearchContext, TooltipContentBase } from ".";
import { Button } from "../ui/button";

export interface Key {
  label: string;
  value: string;
}

export const SelectFilter = (props: {
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

  const updateSearchValue = (value: Key | null) => {
    if (value == null) {
      clear();
      return;
    }
    setSearchParams({
      ...searchParams,
      [props.key_name]: value.value,
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
        <Select onChange={updateSearchValue} options={props.keys}></Select>
        {props.key_name in searchParams && (
          <Button onClick={clear} size="sm" color="error">
            Deshabilitar
          </Button>
        )}
      </div>
    </TooltipContentBase>
  );
};
