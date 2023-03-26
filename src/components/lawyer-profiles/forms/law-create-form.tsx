"use client";
import { InputField } from "@/components/fields";
import { Button } from "@/components/ui/button";
import { FormSection } from "@/components/ui/form-section";
import { Label } from "@/components/ui/label";
import { useCreateMyLawyerProfileMutation } from "@/store/endpoints/lawyerProfiles";
import { LawyerProfileAttributes } from "@/store/types/LawyerProfile";
import { Form, Formik, FormikHelpers } from "formik";

export const LawyerCreateForm = () => {

  const [mutation] = useCreateMyLawyerProfileMutation();

  const submit = (values: Partial<LawyerProfileAttributes>, helpers: FormikHelpers<Partial<LawyerProfileAttributes>>) => {
    mutation(values).unwrap().then(() => {
      helpers.setSubmitting(false);
    }).catch((err) => {
      helpers.setErrors(err.data);
      helpers.setSubmitting(false);
    });
  }


  return (
    <Formik initialValues={{email: "", phone: ""}} onSubmit={submit}>
      <Form>
        <div className="grid grid-cols-1 gap-3">
          <FormSection title="Datos personales" note="Se actualizan en tiempo real." description="">
            <p className="text-sm">Obtenemos los datos personales: Nombre y Apellido desde tu cuenta de ERRENTA.</p>
          </FormSection>
          <Button type="submit">Guardar</Button>
        </div>
      </Form>
    </Formik>
  )
}