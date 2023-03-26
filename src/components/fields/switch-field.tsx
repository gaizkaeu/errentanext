"use client";
import { at } from "lodash";
import { useField, useFormikContext } from "formik";
import { Switch } from "../ui/switch";

export function SwitchField(props: { name: string; autoSubmit?: boolean, [x: string]: any }) {
  const { name, ...rest } = props;
  const [field, meta, helpers] = useField({
    name: name,
    type: "checkbox",
  });

  const { submitForm } = useFormikContext();

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

  function onChange() {
    if (props.onFalse && !field.value) {
      helpers.setValue(props.onFalse);
    } else if (props.onTrue && field.value) {
      helpers.setValue(props.onTrue);
    } else
      helpers.setValue(!field.value);

    if (props.autoSubmit) {
      submitForm();
    }
  }

  return (
    <div className="grid w-full items-center gap-1.5">
      <Switch  onCheckedChange={onChange} checked={field.checked}/>
      <p className="text-sm text-slate-500 ">{_renderHelperText()}</p>
    </div>
  );
}
