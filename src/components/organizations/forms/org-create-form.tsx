"use client";
import InputField from "@/components/fields/InputField";
import { Button } from "@/components/ui/button";
import { useCreateOrganizationMutation } from "@/store/endpoints/organizations";
import { OrganizationAttributes } from "@/store/types/Organization";
import { Form, Formik, FormikHelpers } from "formik";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

export const OrganizationCreateForm = () => {
  const [mutation] = useCreateOrganizationMutation();
  const r = useRouter();

  const onSubmit = (values: Partial<OrganizationAttributes>, helpers: FormikHelpers<OrganizationAttributes>) => {
    mutation(values).unwrap().then((org) => {
      helpers.setSubmitting(false);
      r.push(`/organization-manage/${org.id}`);
    }).catch((err) => {
      helpers.setErrors(err.data);
      helpers.setSubmitting(false);
    });
  };

  return (
    <div>
      <Formik
        initialValues={{
          name: "",

        } as OrganizationAttributes}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="grid grid-cols-1">
              <div className="grid grid-cols-1">
                <p className="text-xl font-bold">General</p>
                <Label htmlFor="name">Nombre</Label>
                <InputField name="name" />
                <Label htmlFor="name">Descripción</Label>
                <InputField name="description" label="Descripción" />
              </div>
              <div className="grid grid-cols-1">
                <p className="text-xl font-bold">Contacto</p>
                <Label htmlFor="website">Página web</Label>
                <InputField name="website" label="Sitio web" />
                <Label htmlFor="phone">Teléfono</Label>
                <InputField name="phone" label="Teléfono" />
                <Label htmlFor="email">Correo electrónico</Label>
                <InputField name="email" label="Correo electrónico" />
              </div>
              <div className="grid grid-cols-1">
                <p className="text-xl font-bold">Ubicación</p>
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
              </div>
              <Button type="submit" color="primary" disabled={isSubmitting}>
                Guardar
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
