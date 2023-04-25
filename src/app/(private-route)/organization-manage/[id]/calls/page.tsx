"use client";
import { CallManageComponent } from "@/components/contact";
import { useGetCallsManageQuery } from "@/store/endpoints/calls";


export default function Page({ params }: { params: { id: string } }) {

  const { data } = useGetCallsManageQuery({ org_id: params.id })

  return (
    <div className="w-full">
      {data?.map((call) => (
        <CallManageComponent key={call.id} call={call} />
      ))}
    </div>
  );
}