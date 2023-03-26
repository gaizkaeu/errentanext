"use client";
import { Button } from "@/components/ui/button";
import { useAcceptOrganizationInvitationMutation, useGetOrganizationByIdQuery } from "@/store/endpoints/organizations"
import { OrganizationInvitation } from "@/store/types/Organization"

export const OrganizationInvitationComponent = (props: {inv: OrganizationInvitation}) => {

  const {currentData} = useGetOrganizationByIdQuery(props.inv.attributes.organization_id);
  const [mutation] = useAcceptOrganizationInvitationMutation();
  
  return (
    <div className="animate animate-in slide-in-from-top-0 bg-green-100 dark:bg-green-800 rounded-lg p-3 shadow-md">
      <p className="text-xl font-bold">
        Te han invitado a la asesoría <br />
        <span className="font-light">{currentData?.attributes.name}</span>.
      </p>

      <p className="text-lg font-bold">
        <span className="font-light">Obtendrás permisos de </span> {props.inv.attributes.role}
      </p>

      <p className="text-sm mt-2">
        Para unirte a la asesoría, debes aceptar la invitación.
      </p>

      <Button className="mt-2" size="sm" onClick={() => mutation(props.inv.attributes.token)}>
        Aceptar
      </Button>
    </div>
  )

}