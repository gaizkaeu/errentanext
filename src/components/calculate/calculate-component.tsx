"use client";

export { CalculationComponent } from "./calculation/user-calculation-component";


import { useCreateCalculationMutation } from "@/store/endpoints/calculations";
import { Calculator } from "@/store/types/Calculator";
import { Form, Formik } from "formik";
import { useParams, useRouter } from "next/navigation";

export const CalculateComponent = (props: { calculator: Calculator, org_id: string, children: React.ReactNode[] | React.ReactNode }) => {
  const r = useRouter();
  const s = useParams();
  const [mutation] = useCreateCalculationMutation();

  const onSubmit = (values: any) => {
    if (s['q_id'] === (props.calculator.attributes.questions.length - 1).toString()) {
      mutation(values).unwrap().then((data) => {
        console.log(data);
        r.push(`/calculations/${data.id}`)
      })
    } else {
      r.push(`/organizations/${props.org_id}/calculate/${props.calculator.id}/${parseInt(s['q_id']) + 1}`);
    }
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
