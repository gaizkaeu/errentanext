"use client";
import { Button } from "@/components/ui/button";
import { useCreateCalculationManageMutation, useCreateCalculationManagePreviewQuery, useGetCalculatorManageQuery } from "@/store/endpoints/calculations";
import { Form, Formik, useFormikContext } from "formik";
import { CalculationField, ClassificationSelectField } from "./calculation-field";
import { CalculatorManage } from "@/store/types/Calculator";
import { Preview } from "./calculation-preview";

export const CalculationManageCreateForm = (props: { calculator: CalculatorManage, org_id: string }) => {

  const { data } = useGetCalculatorManageQuery({calcr_id: props.calculator.id,
  org_id: props.org_id})
  const [mutation] = useCreateCalculationManageMutation();



  const onSubmit = (values: any) => {
    mutation({
      calculator_id: props.calculator.id,
      org_id: props.org_id,
      ...values
    })
  }


  return (
    <Formik initialValues={{train_with: true}} onSubmit={onSubmit}>
      {({values}) => (
      <Form>

        <p className="text-lg leading-6 font-medium ">
          Añadir datos de entrenamiento
        </p>

        <div className="mt-5 grid grid-cols-1 gap-3 max-w-xs">
          {props.calculator.attributes.questions.map((question) => (
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
          <Preview calculator_id={props.calculator.id} org_id={props.org_id} />
        </div>
        <Button type="submit" className="mt-5">Guardar</Button>
      </Form>
      )}
    </Formik>
  )

}

