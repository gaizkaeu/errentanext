import { InputField, TagsField } from "@/components/fields"
import { FormSection } from "@/components/ui/form-section"
import { Label } from "@/components/ui/label"

export const Contact = () => {
  return (
    <FormSection title="Contacto" note="Los datos inválidos pueden desactivar tu cuenta." description="Datos de contacto corportativos.">
      <Label htmlFor="email">Correo electrónico</Label>
      <InputField type="email" name="email" id="email" />
      <Label htmlFor="phone">Teléfono</Label>
      <InputField type="tel" name="phone" id="phone" />
    </FormSection>
  )
}

export const Tags = () => {
  return (
    <FormSection title="Etiquetas" description="Etiquetas para tu perfil." note={"Añadirá estas especidades a la organización que pertenezcas."}>
      <Label htmlFor="skill_list">Especialidades</Label>
      <TagsField name="skill_list"  />
    </FormSection>
  )
}