import { at } from "lodash";
import { useField } from "formik";
import AsyncSelect from "react-select/async";
import { useLazyGetOrganizationsQuery } from "@/store/endpoints/organizations";
import { ActionMeta, SingleValue } from "react-select";

export function OrganizationPickField(props: {
  name: string;
  [x: string]: any;
}) {
  const { name } = props;
  const [, meta, helpers] = useField(name);
  const [orgs] = useLazyGetOrganizationsQuery();

  function _renderHelperText() {
    const [touched, error] = at(meta, "touched", "error");
    if (touched && error) {
      return error;
    }
  }

  const handleOnSearch = async (inputValue: string) => {
    const data = await orgs({ name: inputValue }).unwrap();
    return data.map((org) => {
      return { label: org.attributes.name, value: org.id };
    });
  };

  const onSelect = (newValue: SingleValue<{ label: string; value: string; }>, actionMeta: ActionMeta<{ label: string; value: string; }>) => {
    if (newValue)
      helpers.setValue(newValue.value);
  };

  return (
    <div>
      <AsyncSelect
        loadOptions={handleOnSearch}
        isClearable
        onChange={onSelect}
      />
      {_renderHelperText()}
    </div>
  );
}
