"use client";

import { useField, useFormikContext } from 'formik';
import { MultiValue } from 'react-select';
import CreatableSelect from 'react-select/creatable';

export const TagsField = (props: {
  name: string;
}) => {

  const { name, ...rest } = props;
  const { submitForm } = useFormikContext();
  const [field, meta, helpers] = useField({
    name: name
  });

  const change = (newValue: MultiValue<any>,) => {
    helpers.setValue(newValue.map((tag: any) => {
      return tag.value
    }))
    submitForm();
  }


  return (
    <CreatableSelect isMulti defaultValue={
      field.value.map((tag: string) => {
        return { label: tag, value: tag }
      })
    }
    onChange={change}
    />
  )
}