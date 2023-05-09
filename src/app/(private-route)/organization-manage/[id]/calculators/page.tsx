"use client";
import { CalculatorManageComponent } from "@/components/calculate";
import { useGetOrganizationCalculatorsQuery } from "@/store/endpoints/organizations";
import Link from "next/link";


export default function Page({ params }: { params: { id: string } }) {

  const { data } = useGetOrganizationCalculatorsQuery({ id: params.id, filters: {} }, {
    pollingInterval: 10000,
  });

  return (
    <div className="w-full">
      {data?.map((calculator) => (
        <Link href={`/organization-manage/${params.id}/calculators/${calculator.id}`} key={calculator.id}>
          <CalculatorManageComponent calculator={calculator} />
        </Link>
      ))}
    </div>
  );
}