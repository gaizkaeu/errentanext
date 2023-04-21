"use client";
import { SelectUniqueField } from "@/components/fields";
import { Button } from "@/components/ui/button";
import { useCreateCalculationManageMutation, useGetCalculatorManageQuery } from "@/store/endpoints/calculations";
import { Form, Formik } from "formik";
import { CalculationField, ClassificationSelectField } from "./calculation-field";
import { CalculatorManage } from "@/store/types/Calculator";

export const CalculationCreateForm = (props: { calculator: CalculatorManage, org_id: string }) => {

  const { data } = useGetCalculatorManageQuery({calcr_id: props.calculator.id,
  org_id: props.org_id})
  const [mutation] = useCreateCalculationManageMutation();


  const onSubmit = (values: any) => {
    mutation({
      calcr_id: props.calculator.id,
      org_id: props.org_id,
      ...values
    })
  }


  return (
    <Formik initialValues={{train_with: true}} onSubmit={onSubmit}>
      {({values}) => (
      <Form>

        <p className="text-lg leading-6 font-medium text-gray-900">
          Añadir datos de entrenamiento
        </p>

        <div className="mt-5 flex flex-wrap gap-3">
          {props.calculator.attributes.questions.map((question) => (
            <div key={question.name}>
              <CalculationField question={question} />
            </div>
          ))}
        </div>

        <p className="text-lg leading-6 font-medium text-gray-900 mt-5">
          Clasificación
        </p>

        <ClassificationSelectField classifications={data?.attributes.classifications ?? {}} />

        <Button type="submit" className="mt-5">Guardar</Button>
      </Form>
      )}
    </Formik>
  )

}