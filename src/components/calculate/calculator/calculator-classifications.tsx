"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalculatorManage } from "@/store/types/Calculator";
import { CodeBracketSquareIcon, PlusIcon } from "@heroicons/react/24/outline";
import { Form, Formik } from "formik";
import { useUpdateCalculatorManageMutation } from "@/store/endpoints/calculations";
import { InputField } from "@/components/fields";

export const CalculatorClassifications = (props: { calculator: CalculatorManage }) => {
  const { calculator } = props;
  const [mutation] = useUpdateCalculatorManageMutation()

  const onSubmit = (values: any) => {
    mutation({
      calculator_id: calculator.id,
      org_id: calculator.attributes.organization_id,
      ...values
    })
  }

  return (
    <div>
      <div className="flex items-center gap-2">
        <p className="text-xs text-gray-500">Clasificaciones</p>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-5 h-5 rounded-full p-0">
              <CodeBracketSquareIcon className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            {Object.entries(calculator.attributes.exposed_variables_formatted).map(([key, value]) => (
              <div key={key}>
                {key}
                <Badge className="ml-2">
                  {value}
                </Badge>
              </div>
            ))}
          </PopoverContent>
        </Popover>
      </div>
      <Formik initialValues={{ classifications: calculator.attributes.classifications, nueva_clasificacion: "" }} onSubmit={onSubmit}>
        {({ values, setValues }) => (
          <Form>
            {Object.entries(values.classifications).map(([key, value]) => (
              <div className="" key={key}>
                <p className="text-xs  underline uppercase">{key}</p>
                <InputField name={`classifications[${key}]`} />
              </div>
            ))}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-10 rounded-full p-0">
                  <PlusIcon className="h-4 w-4" />
                  <span className="sr-only">Open popover</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium leading-none">Nueva clasificacion</h4>
                    <p className="text-sm text-muted-foreground">
                      Nombre de la clasificación
                    </p>
                  </div>
                  <div className="grid gap-2">
                    <div className="grid grid-cols-3 items-center gap-4">
                      <InputField name="nueva_clasificacion" />
                      <Button type="button" onClick={() => {setValues({classifications: { ...values.classifications, [values.nueva_clasificacion]: "" }, nueva_clasificacion: ""})}}>Crear</Button>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
            <Button type="submit" className="mt-5">Guardar</Button>
          </Form>
        )}
      </Formik>
    </div>
  )
}