"use client";
import { OrganizationEditForm, OrganizationLocation } from "@/components/organizations";
import { useGetOrganizationManageByIdQuery } from "@/store/endpoints/organizations";


export default function Page({ params }: { params: { id: string } }) {

  const { data } = useGetOrganizationManageByIdQuery(params.id);

  return (
    <div className="w-full">
      {data && (
        <>
          <OrganizationEditForm organization={data} />
          <p className="text-xl font-bold">Ubicación</p>
          <OrganizationLocation latitude={data.attributes.latitude} longitude={data.attributes.longitude} />
        </>
      )}
    </div>
  );
}