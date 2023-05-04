import { InputField, SelectUniqueField } from "@/components/fields"
import { Label } from "@/components/ui/label"
import { Question } from "@/store/types/Calculator"
import { BooleanInput, NumericInputWDefaults } from "./calculator-client-components"

export const CalculationField = (props: { question: Question, manage?: boolean }) => {
  switch (props.question.field_type) {
    case "input":
      return <>
        <Label htmlFor={props.question.name}>{props.question.title}</Label>
        <InputField name={`input[${props.question.name}]`} />
      </>
    case "select_unique":
      return <>
        <Label htmlFor={props.question.name}>{props.question.title}</Label>
        <SelectUniqueField name={`input[${props.question.name}]`} options={props.question.options.map((v) => ([v,v]))} />
      </>
    case "boolean":
      return <>
        {!props.manage && <BooleanInput {...props.question} />}
        {props.manage && (
          <>
            <Label htmlFor={props.question.label}>{props.question.label}</Label>
            <InputField name={`input[${props.question.name}]`} />
          </>
          )
        }
      </>
    case "input_with_defaults":
      return <>
        {!props.manage && <NumericInputWDefaults {...props.question} />}
        {props.manage && (
          <>
            <Label htmlFor={props.question.label}>{props.question.label}</Label>
            <InputField name={`input[${props.question.name}]`} />
          </>
          )
        }
      </>
    default:
      return <></>
  }
}

export const ClassificationSelectField = (props: { classifications: {[key:string]: string}}) => {

  return (
    <SelectUniqueField name="output[classification]" options={Object.keys(props.classifications).map((v) => ([v,v]))} />
  )
}