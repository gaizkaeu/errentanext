"use client";
import { Button } from "@/components/ui/button";
import { useUpdateOrganizationByIdMutation } from "@/store/endpoints/organizations";
import { Organization, OrganizationAttributes } from "@/store/types/Organization";
import { Form, Formik, FormikHelpers } from "formik";
import { Label } from "@/components/ui/label";
import { InputField, TagsField } from "@/components/fields";
import { FormSection } from "@/components/ui/form-section";

export const OrganizationEditForm = (props: { organization: Organization }) => {
  const [mutation] = useUpdateOrganizationByIdMutation();

  const onSubmit = (values: Partial<OrganizationAttributes>, helpers: FormikHelpers<OrganizationAttributes>) => {
    if (props.organization) {
      mutation({ id: props.organization.id, ...values }).unwrap().then(() => {
        helpers.setSubmitting(false);
      }).catch((err) => {
        helpers.setErrors(err.data);
        helpers.setSubmitting(false);
      });
    }
  };

  return (
    <div>
      <Formik
        initialValues={props.organization?.attributes ?? {}}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="grid grid-cols-1 space-y-3">
              <FormSection title="General" description="Información sobre tu asesoría" note="Se conciso y claro.">
                <Label htmlFor="name">Nombre</Label>
                <InputField name="name" />
                {/* <TextAreaField name="description" label="Descripción" /> */}
              </FormSection>
              <FormSection title="Etiquetas" description="Etiquetas de tu asesoría." note={""}>
                <Label htmlFor="skill_list">Especialidades</Label>
                <TagsField name="skill_list"  />
              </FormSection>
              <FormSection title="Target" description="Que tipo de compañias quieres" note={"Solo se verificarán las que coincidan con la de tus abogados."}>
                <Label htmlFor="company_target_list">Tipos</Label>
                <TagsField name="company_target_list"  />
              </FormSection>
              <FormSection title="Servicios" description="Servicios que ofreces" note={""}>
                <Label htmlFor="service_list">servicios</Label>
                <TagsField name="service_list"  />
              </FormSection>
              <FormSection title="Contacto" description="Métodos de contacto para tus clientes." note="Mantén la información actualizada">
                <Label htmlFor="website">Página web</Label>
                <InputField name="website" label="Sitio web" />
                <Label htmlFor="phone">Teléfono</Label>
                <InputField name="phone" label="Teléfono" />
                <Label htmlFor="email">Correo electrónico</Label>
                <InputField name="email" label="Correo electrónico" />
              </FormSection>
              <FormSection title="Ubicación" description="Métodos de contacto para tus clientes." note="Mantén la información actualizada">
                <Label htmlFor="city">Ciudad</Label>
                <InputField name="city" label="city" />
                <Label htmlFor="street">Calle</Label>
                <InputField name="street" label="street" />
                <Label htmlFor="postal_code">Código postal</Label>
                <InputField name="postal_code" label="postal_code" />
                <Label htmlFor="province">Provincia</Label>
                <InputField name="province" label="province" />
                <Label htmlFor="country">País</Label>
                <InputField name="country" label="country" />
              </FormSection>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
