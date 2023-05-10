"use client";
import { Button } from "@/components/ui/button";
import { useCreateCalculationManageMutation, useGetCalculatorManageQuery } from "@/store/endpoints/calculations";
import { Form, Formik, FormikHelpers } from "formik";
import { CalculationField, ClassificationSelectField } from "./calculation-field";
import { CalculationAttributes, CalculatorManage } from "@/store/types/Calculator";
import { Preview } from "./calculation-preview";

export const CalculationManageCreateForm = (props: { calculator: CalculatorManage, org_id: string }) => {

  const { data } = useGetCalculatorManageQuery({
    calcr_id: props.calculator.id,
    org_id: props.org_id
  })
  const [mutation, { isLoading, isError, error, isSuccess }] = useCreateCalculationManageMutation();

  const onSubmit = (values: Partial<CalculationAttributes>, helpers: FormikHelpers<Partial<CalculationAttributes>>) => {
    mutation({
      calculator_id: props.calculator.id,
      org_id: props.org_id,
      ...values
    })
  }


  return (
    <Formik initialValues={{ train_with: true }} onSubmit={onSubmit}>
      <Form>
        {isError && <div className="text-red-500">ERROR</div>}
        {isSuccess && <div className="text-green-500">SUCCESS</div>}
        <p className="text-lg leading-6 font-medium ">
          Añadir datos de entrenamiento
        </p>
        <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-3">
          {props.calculator.attributes.questions.map((question) => (
            <div key={question.name}>
              <CalculationField question={question} manage={true} />
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
        <Button type="submit" className="mt-5" disabled={isLoading}>Guardar</Button>
      </Form>
    </Formik>
  )

}

