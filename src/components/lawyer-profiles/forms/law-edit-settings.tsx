"use client";
import { Form, Formik, FormikHelpers } from "formik";
import { Label } from "@/components/ui/label";
import { SwitchField } from "@/components/fields";
import { LawyerProfile, LawyerProfileAttributes } from "@/store/types/LawyerProfile";
import { FormSection } from "@/components/ui/form-section";
import { useUpdateMyLawyerProfileMutation } from "@/store/endpoints/lawyerProfiles";

export const LawyerEditSettings = (props: {law: LawyerProfile}) => {

  const [mutation] = useUpdateMyLawyerProfileMutation();

  const submit = (values: Partial<LawyerProfileAttributes>, helpers: FormikHelpers<Partial<LawyerProfileAttributes>>) => {
    mutation(values).unwrap().then(() => {
      helpers.setSubmitting(false);
    });
  }

  return (
    <div>
      <Formik
        initialValues={{on_duty: props.law.attributes.on_duty}}
        onSubmit={submit}
      >
        {({ isSubmitting }) => (
          <Form>
            <FormSection title="Configuración" description={""} note={""}>
              <div className="grid grid-cols-1 space-y-3">
                <p className="text-xl font-bold">Estado</p>
                <div className="flex items-center space-x-2 w-12">
                  <SwitchField name="on_duty" id="on_duty" autoSubmit />
                  <Label htmlFor="on_duty">En servicio</Label>
                </div>
                <p className="text-xl font-bold">Visiblidad</p>
                <div className="flex items-center space-x-2 w-12">
                  <SwitchField name="settings[hireable]" id="hireable" autoSubmit />
                  <Label htmlFor="settings[hireable]">Público</Label>
                </div>
              </div>
              {isSubmitting && (
                <p>Guardando...</p>
              )}
            </FormSection>
          </Form>
        )}
      </Formik>
    </div>
  );
};
