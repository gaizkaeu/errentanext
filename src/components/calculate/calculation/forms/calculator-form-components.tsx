import { InputField, SelectUniqueField } from "@/components/fields"
import { Label } from "@/components/ui/label";
import { QuestionInput, QuestionSelectUnique } from "@/store/types/Calculator"

export const InputComponent = (props: QuestionInput) => {
  return (
    <>
      <Label>{props.title}</Label>
      <InputField name={`input[${props.name}`} />
    </>
  )
}


export const SelectUniqueComponent = (props: QuestionSelectUnique) => {
  return (
    <>
      <SelectUniqueField name={`input[${props.name}`} options={props.options.map((v) => [v,v])} />
    </>
  )
}
