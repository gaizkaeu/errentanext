"use client";
import { useContext } from "react";
import { BaseTooltip, SearchContext, TooltipContentBase } from "@/components/filters";
import AsyncSelect from "react-select/async";
import { useLazyGetOrganizationsQuery } from "@/store/endpoints/organizations";
import { SingleValue } from "react-select";

export const OrganizationFilter = (props: { title: string; key_name: string }) => {
  const { searchParams } = useContext(SearchContext);

  return (
    <BaseTooltip title={props.title} active={props.key_name in searchParams}>
      <OrgConfiguration {...props} />
    </BaseTooltip>
  );
};

export const OrgConfiguration = (props: {
  title: string;
  key_name: string;
}) => {
  const { searchParams, setSearchParams } = useContext(SearchContext);
  const [orgs] = useLazyGetOrganizationsQuery();

  const handleOnSearch = async (inputValue: string) => {
    const data = await orgs({ name: inputValue }).unwrap();
    return data.map((org) => {
      return { label: org.attributes.name, value: org.id };
    });
  };

  const onSelect = (newValue: SingleValue<{ label: string; value: string; }>) => {
    if (newValue) {
      setSearchParams({
        ...searchParams,
        [props.key_name]: newValue.value,
        [`${props.key_name}_title`]: newValue.label,
      });
    }
  };


  // const clear = () => {
  //   setSearchParams((current: any) => {
  //     const cp = { ...current };
  //     delete cp[props.key_name];
  //     delete cp[`${props.key_name}_title`];
  //     return cp;
  //   });
  // };

  return (
    <TooltipContentBase title={props.title}>
      <AsyncSelect
        loadOptions={handleOnSearch}
        defaultValue={{value: searchParams[props.key_name], label: searchParams[`${props.key_name}_title`]}}
        isClearable
      />
    </TooltipContentBase>
  );
};
