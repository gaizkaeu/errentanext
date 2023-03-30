"use client";

import { InputField } from "@/components/fields";
import { Label } from "@/components/ui/label";
import { useLazyGetOrganizationInvitationQuery } from "@/store/endpoints/organizations";
import { Form, Formik, useFormikContext } from "formik";
import { useEffect } from "react";
import { OrganizationInvitationComponent } from "../invitation";
import { useSearchParams } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { OrganizationCreateButton } from "./org-create-button";

export const OrganizationJoinComponent = () => {

  const s = useSearchParams();

  return (
    <div className="bg-slate-50 dark:bg-midnight-700 rounded-lg p-3">
      <p className="text-xl font-bold">Unirse a una <span className="font-light">asesoría</span>.</p>
      <Formik onSubmit={() => {}} initialValues={{code: s.get('code')}}>
        <Form>
          <Label htmlFor="code">Código de la asesoría</Label>
          <InputField name="code" />
          <PreviewInvitation />
        </Form>
      </Formik>
      <br />
      <Separator />
      <br />
      <p className="text-xl font-bold">Inscribe tu <span className="font-light">asesoría</span>.</p>
      <OrganizationCreateButton />
    </div>
  )
}

const PreviewInvitation = () => {
  const { values }: {values: {code: string}} = useFormikContext();

  const [inv, {isSuccess, currentData, isUninitialized}] = useLazyGetOrganizationInvitationQuery();

  useEffect(() => {
    if (values.code && values.code.length == 24) {
      inv(values.code)
    }

  }, [values])

  if (currentData) {
    return (
      <OrganizationInvitationComponent inv={currentData} />
    )
  } else if (!isSuccess && !isUninitialized) {
    return (
      <p className="text-md font-bold">
        No se encontró ninguna asesoría con el código <span className="font-light">{values.code}</span>.
      </p>
    )
  } else {
    return (
      <p className="text-md font-bold">
       Introduce el <span className="font-light">código</span> para poder unirte a la asesoría.
      </p>
    )
  }
}