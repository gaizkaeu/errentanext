"use client";
import { Button } from "@/components/ui/button"
import { Form, Formik, FormikHelpers } from "formik"
import { OrganizationMembershipRoleField } from "../fields";
import { InputField } from "@/components/fields";
import { Label } from "@/components/ui/label";
import { OrganizationInvitationAttributes } from "@/store/types/Organization";
import { useCreateOrganizationInvitationMutation } from "@/store/endpoints/organizations";

export const OrganizationMembershipInviteForm = (props: { organization_id: string }) => {

  const [mutation] = useCreateOrganizationInvitationMutation();

  const onSubmit = (values: OrganizationInvitationAttributes, helpers: FormikHelpers<OrganizationInvitationAttributes>) => {

    mutation(values).unwrap().then(() => {
      helpers.setSubmitting(false);
      helpers.resetForm();
      helpers.setStatus({ success: true });
    }).catch((err) => {
      helpers.setErrors(err.data);
      helpers.setSubmitting(false);
    });

  }

  return (

    <Formik onSubmit={onSubmit} initialValues={{ organization_id: props.organization_id, role: "admin", email: "", token: ""}}>
      {({ isSubmitting, status }) => (
      <Form>
        {status?.success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Invitación enviada!</strong>
            <span className="block sm:inline"> El usuario ha sido invitado a la organización</span>
          </div>
        )}
        <Label htmlFor="email">Correo electrónico</Label>
        <InputField name="email" />
        <div className="grid grid-cols-2 gap-4 ">
          <OrganizationMembershipRoleField name="role" />
          <Button disabled={isSubmitting}>
            Crear invitación
          </Button>
        </div>
      </Form>
      )}
    </Formik>
  )
}