"use client";
import { Data, TrainButton } from "@/components/calculate";
import { useGetCalculatorManageQuery } from "@/store/endpoints/calculations";

export default function Page({ params }: { params: { id: string, c_id: string } }) {

  const { data: calculator } = useGetCalculatorManageQuery({ org_id: params.id, calcr_id: params.c_id }, {
    pollingInterval: 10000,
  });

  return calculator ? (
    <>
      <Data calculator={calculator} />
      <TrainButton calculator={calculator} />

    </>
  ) : <></>
}