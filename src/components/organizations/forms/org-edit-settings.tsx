"use client";
import { useUpdateOrganizationByIdMutation } from "@/store/endpoints/organizations";
import { Organization, OrganizationAttributes } from "@/store/types/Organization";
import { Form, Formik, FormikHelpers } from "formik";
import { Label } from "@/components/ui/label";
import { SwitchField } from "@/components/fields";

export const OrganizationEditSettings = (props: {organization: Organization}) => {
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
            <div className="grid grid-cols-1">
              <div className="grid grid-cols-1 space-y-3">
                <p className="text-xl font-bold">Visibilidad</p>
                <div className="flex items-center space-x-2 w-12">
                  <SwitchField name="visible" id="visible" autoSubmit />
                  <Label htmlFor="visible">Visibile</Label>
                </div>
                <p className="text-xl font-bold">Habilitar contrataciones</p>
                <div className="flex items-center space-x-2 w-12">
                  <SwitchField name="settings[hireable]" id="hireable" autoSubmit />
                  <Label htmlFor="settings[hireable]">Contratable</Label>
                </div>
                <p className="text-xl font-bold">Habilitar citas</p>
                <div className="flex items-center space-x-2 w-12">
                  <SwitchField name="settings[appointment_open]" id="appointments" autoSubmit />
                  <Label htmlFor="settings[appointment_open]">Citas</Label>
                </div>
              </div>
              {isSubmitting && (
                <p>Guardando...</p>
              )}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
