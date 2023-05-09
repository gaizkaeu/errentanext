"use client";
import { InputField } from "@/components/fields";
import { Button } from "@/components/ui/button";
import { QuestionBoolean, QuestionInputWithDefaults } from "@/store/types/Calculator";
import { CheckBadgeIcon } from "@heroicons/react/24/outline";
import { useField } from "formik";
import { useState } from "react";

export const NumericInputWDefaults = (props: QuestionInputWithDefaults) => {
  const { name, ...rest } = props;
  const [input, setInput] = useState(false);
  const [field, meta, helpers] = useField({
    name: `input[${props.name}]`,
  });

  return (
    <>
      <div className="space-y-2 w-full">
        {input && (
          <div className="flex gap-2">
            <InputField name={`input[${props.name}]`} />
            <Button type="submit" onClick={() => setInput(false)} variant="link">
              <CheckBadgeIcon className="w-5 h-5" />
            </Button>
          </div>
        )}
        {props.options.map((option) => (
          <Button type="submit"  key={option.value} onClick={() => helpers.setValue(option.value)} className={`w-full ${field.value === option.value && "bg-green-500 dark:bg-green-500 hover:bg-green-700 dark:hover:bg-green-700"}`}>
            {option.key}
          </Button>
        ))}
        {field.value && props.options.find((v) => v.value === field.value) === undefined && (
          <Button type="button" className="w-full bg-green-500 dark:bg-green-500 hover:bg-green-700 dark:hover:bg-green-700">
            Otro - {field.value} 
          </Button>
        )}
        {!input && (
          <Button onClick={() => setInput(true)} type="button" className="w-full" variant="outline">
            Introducir manualmente
          </Button>
        )}
      </div>
    </>
  )
}

export const BooleanInput = (props: QuestionBoolean) => {
  const { name, ...rest } = props;
  const [field, _,helpers] = useField({
    name: `input[${props.name}]`,
  });

  const options = [
    {
      key: "Sí",
      value: "true",
    }, {
      key: "No",
      value: "false",
    }
  ]

  return (
    <>
      <div className="space-y-2">
        {options.map((option) => (
          <Button type="submit" key={option.value} onClick={() => helpers.setValue(option.value)} className={`w-full ${field.value === option.value && "bg-green-500 dark:bg-green-500"}`}>
            {option.key}
          </Button>
        ))}
      </div>
    </>
  )
}
