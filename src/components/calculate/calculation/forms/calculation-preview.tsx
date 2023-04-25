"use client";
import { useCreateCalculationManagePreviewQuery } from "@/store/endpoints/calculations";
import { useFormikContext } from "formik";

export const Preview = (props: {calculator_id: string, org_id: string}) => {

  const { values, submitForm } = useFormikContext();

  const { data: preview } = useCreateCalculationManagePreviewQuery({...values as {[key:string]: string}, calculator_id: props.calculator_id,
    org_id: props.org_id})

  return (
    <p>
      {Object.entries(preview ?? {}).map(([key, value]) => (
        <p key={key}>
          {key}: {value}
        </p>
      ))}
    </p>
  )
}