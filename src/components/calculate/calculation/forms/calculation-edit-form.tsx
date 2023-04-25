"use client";
import { SelectUniqueField } from "@/components/fields";
import { Button } from "@/components/ui/button";
import { useGetCalculatorManageQuery, useUpdateCalculationManageMutation } from "@/store/endpoints/calculations";
import { CalculationManage } from "@/store/types/Calculator";
import { Form, Formik } from "formik";
import { CalculationField, ClassificationSelectField } from "./calculation-field";
import { Preview } from "./calculation-preview";

export const CalculationEditForm = (props: { calculation: CalculationManage, org_id: string }) => {

  const { data } = useGetCalculatorManageQuery({calcr_id: props.calculation.attributes.calculator_id,
  org_id: props.org_id})
  const [mutation] = useUpdateCalculationManageMutation();


  const onSubmit = (values: any) => {

    mutation({
      calcr_id: props.calculation.attributes.calculator_id,
      org_id: props.org_id,
      calcn_id: props.calculation.id,
      ...values
    })
  }


  return (
    <Formik initialValues={props.calculation.attributes} onSubmit={onSubmit}>
      {({values}) => (
      <Form>

        <p className="text-lg leading-6 font-medium">
          Input Variables
        </p>

        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {props.calculation.attributes.questions.map((question) => (
            <div key={question.name}>
              <CalculationField question={question} />
            </div>
          ))}
        </div>

        <p className="text-lg leading-6 font-medium mt-5">
          Clasificación
        </p>
        <div className="flex gap-3">
          <ClassificationSelectField classifications={data?.attributes.classifications ?? {}} />
          <Preview calculator_id={props.calculation.attributes.calculator_id} org_id={props.org_id} />
        </div>

        <Button type="submit" className="mt-5">Guardar</Button>
      </Form>
      )}
    </Formik>
  )

}