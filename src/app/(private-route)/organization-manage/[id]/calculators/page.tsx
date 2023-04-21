"use client";
import { CalculatorManageComponent } from "@/components/calculate";
import { useGetOrganizationCalculatorsQuery } from "@/store/endpoints/organizations";


export default function Page({ params }: { params: { id: string } }) {

  const { data } = useGetOrganizationCalculatorsQuery({ id: params.id, filters: {} });

  return (
    <div className="w-full">
      {data?.map((calculator) => (
        <CalculatorManageComponent calculator={calculator} key={calculator.id} />
      ))}

    </div>
  );
}