"use client";

export { CalculationComponent } from "./calculation-component";


import { useCreateCalculationMutation } from "@/store/endpoints/calculations";
import { Calculator } from "@/store/types/Calculator";
import { Form, Formik } from "formik";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export const CalculateComponent = (props: { calculator: Calculator, org_id: string, children: React.ReactNode[] | React.ReactNode }) => {
  const r = useRouter();
  const [mutation] = useCreateCalculationMutation();

  const onSubmit = (values: any) => {
    mutation(values).unwrap().then((data) => {
      console.log(data);
      r.push(`/calculations/${data.id}`)
    })
  }

  return (
    <>
      <Formik initialValues={{calculator_id: props.calculator.id}} onSubmit={onSubmit}>
        <Form>
          {props.children}
        </Form>
      </Formik>
    </>
  )
}
