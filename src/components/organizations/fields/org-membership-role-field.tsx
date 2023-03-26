"use client";
import { at } from "lodash";
import { useField } from "formik";
import { ActionMeta, SingleValue } from "react-select";
import { OrganizationMembershipRoles } from "@/store/types/Organization";
import Select from "react-select";

export function OrganizationMembershipRoleField(props: {
  name: string;
  [x: string]: any;
}) {
  const { name } = props;
  const [, meta, helpers] = useField(name);

  function _renderHelperText() {
    const [touched, error] = at(meta, "touched", "error");
    if (touched && error) {
      return error;
    }
  }


  const onSelect = (newValue: SingleValue<{ label: string; value: string; }>, actionMeta: ActionMeta<{ label: string; value: string; }>) => {
    if (newValue)
      helpers.setValue(newValue.value);
  };

  return (
    <div>
      <Select
        options={OrganizationMembershipRoles.map((role) => ({
          label: role,
          value: role,
        }
        ))}
        onChange={onSelect}
      />
      {_renderHelperText()}
    </div>
  );
}
