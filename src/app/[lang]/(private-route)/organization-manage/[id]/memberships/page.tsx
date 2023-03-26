"use client";
import { OrganizationInvitationsTable, OrganizationMembershipInviteForm, OrganizationMembershipsTable } from "@/components/organizations";
import { useGetOrganizationInvitationsQuery, useGetOrganizationMembershipsQuery } from "@/store/endpoints/organizations";


export default function Page({ params }: { params: { id: string } }) {

  const { data } = useGetOrganizationMembershipsQuery({ id: params.id, filters: {} });
  const { data: inv } = useGetOrganizationInvitationsQuery({ id: params.id, filters: {} });

  return (
    <div className="w-full">
      <div className="shadow-normal border dark:border-gray-700 rounded-md">
        <div className="p-4">
          <span className="text-xl font-medium leading-tight ">Añadir personas a tu equipo</span>
          <p className="text-sm mt-2 text-slate-500">Genera un código para que puedan unirse a tu asesoría.</p>
          <div className="mt-2">
            <div className="mt-6 gap-3 max-w-lg">
              <OrganizationMembershipInviteForm organization_id={params.id} />
            </div>
          </div>
        </div>
      </div>
      <br />
      <p className="text-xl leading-tight font-bold ">Miembros de la <span className="font-light">organización</span>.</p>
      <br />
      {data && (
        <OrganizationMembershipsTable memberships={data} />
      )}
      <br />
      <p className="text-xl leading-tight font-bold ">Invitaciones de la <span className="font-light">organización</span>.</p>
      <p className="text-md mt-2 text-slate-500">Las invitaciones expiran después de 7 días.</p>
      <br />
      {inv && (
        <OrganizationInvitationsTable invitations={inv} />
      )}
    </div>
  );
}