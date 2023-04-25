"use client";
import { at } from "lodash";
import { useField } from "formik";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";

export function SelectUniqueField(props: { name: string; options: [string, string][] }) {
  const { name, ...rest } = props;
  const [field, meta, helpers] = useField({
    name: name,
  });

  function _renderHelperText() {
    const [touched, error] = at(meta, "touched", "error");
    if (touched && error) {
      return error;
    }
  }

  function _renderColor() {
    if (meta.touched) {
      if (meta.error) {
        return "error";
      }
      return "success";
    }
    return "default";
  }

  function onChange(value: string) {
    helpers.setValue(value);
  }

  return (
    <div className="grid items-center gap-1.5">
      <Select onValueChange={onChange} defaultValue={field.value}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Selecciona uno" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {props.options.map((option) => (
              <SelectItem key={option[1]} value={option[1]}>
                <SelectLabel>{option[0]}</SelectLabel>
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <p className="text-sm text-slate-500 ">{_renderHelperText()}</p>
    </div>
  );
}
