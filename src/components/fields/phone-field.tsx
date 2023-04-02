"use client";
import { at } from "lodash";
import { useField } from "formik";
import PhoneInput from 'react-phone-number-input'

import 'react-phone-number-input/style.css'

export function PhoneField(props: { name: string;[x: string]: any }) {
  const { name, ...rest } = props;
  const [field, meta, helpers] = useField(name);

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

  return (
    <div className="grid w-full items-center gap-1.5">
      <PhoneInput
        defaultCountry="ES"
        placeholder="Enter phone number"
        onChange={(v) => { helpers.setValue(v) }} />
      <p className="text-sm text-slate-500 ">{_renderHelperText()}</p>
    </div>
  );
}
