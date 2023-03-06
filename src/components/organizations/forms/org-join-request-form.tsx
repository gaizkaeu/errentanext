"use client";
import { Button } from "@/components/ui/button";
import { useCreateOrganizationJoinRequestMutation } from "@/store/endpoints/organizations";
import { OrganizationAttributes } from "@/store/types/Organization";
import { Form, Formik, FormikHelpers } from "formik";
import { Label } from "@/components/ui/label";
import { InputField } from "@/components/fields";
import { useState } from "react";

export const OrganizationJoinRequestForm = () => {
  const [mutation] = useCreateOrganizationJoinRequestMutation();
  const [ isSuccess, setIsSuccess ] = useState(false);

  const onSubmit = (values: Partial<OrganizationAttributes>, helpers: FormikHelpers<OrganizationAttributes>) => {
    mutation(values).unwrap().then((org) => {
      helpers.setSubmitting(false);
      setIsSuccess(true);
    }).catch((err) => {
      helpers.setErrors(err.data);
      helpers.setSubmitting(false);
    });
  };

  return (
    <div>
      {isSuccess ? <Success /> : (
        <Formik
          initialValues={{
            name: "",

          } as OrganizationAttributes}
          onSubmit={onSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="grid grid-cols-1">
                <div className="grid grid-cols-1 space-y-2">
                  <p className="text-xl font-bold">General</p>
                  <Label htmlFor="name">Nombre</Label>
                  <InputField name="name" />
                </div>
                <div className="grid grid-cols-1 space-y-2">
                  <p className="text-xl font-bold">Contacto</p>
                  <Label htmlFor="website">Página web</Label>
                  <InputField name="website" label="Sitio web" />
                  <Label htmlFor="phone">Teléfono</Label>
                  <InputField name="phone" label="Teléfono" />
                  <Label htmlFor="email">Correo electrónico</Label>
                  <InputField name="email" label="Correo electrónico" />
                </div>
                <div className="grid grid-cols-1 space-y-2">
                  <p className="text-xl font-bold">Ubicación</p>
                  <Label htmlFor="city">Ciudad</Label>
                  <InputField name="city" label="city" />
                  <Label htmlFor="province">Provincia</Label>
                  <InputField name="province" label="province" />
                </div>
                <Button type="submit" color="primary" disabled={isSubmitting}>
                  Enviar
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
};


const Success = () => {
  return (
    <div>
      <p className="text-2xl font-bold text-center">¡Tenemos tu solicitud!</p>
      <p>
        En breve nos pondremos en contacto contigo. Te hemos enviado un correo de confirmación.
      </p>
      <p className="font-bold mt-3">Gracias.</p>
    </div>

  );
}