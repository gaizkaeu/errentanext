"use client";
import { CalculationManageCreateForm } from "@/components/calculate/calculation/forms";
import { useGetCalculatorManageQuery } from "@/store/endpoints/calculations";

export default function Page({ params }: { params: { id: string, c_id: string } }) {

  const { data: calculator } = useGetCalculatorManageQuery({ org_id: params.id, calcr_id: params.c_id }, {
    pollingInterval: 10000,
  });

  return calculator ? (
    <>
      <CalculationManageCreateForm calculator={calculator} org_id={calculator.attributes.organization_id} />
    </>
  ) : <></>
}