"use client";
import { CalculatorGraphComponent } from "@/components/calculate/calculator/calculator-graph";
import { useGetCalculatorManageQuery } from "@/store/endpoints/calculations";

export default function Page({ params }: { params: { id: string, c_id: string } }) {

  const { data: calculator } = useGetCalculatorManageQuery({ org_id: params.id, calcr_id: params.c_id }, {
    pollingInterval: 10000,
  });

  return calculator ? (
    <>
      <CalculatorGraphComponent dot={calculator.attributes.dot_visualization} />
    </>
  ) : <></>
}