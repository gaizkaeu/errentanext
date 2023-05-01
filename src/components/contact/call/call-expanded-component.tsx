"use client";
import { CalculationComponent } from "@/components/calculate";
import { useGetCalculationManageQuery } from "@/store/endpoints/calculations";
import { CallManage } from "@/store/types/Call";

export const CallManageExpandedComponent = (props: { call: CallManage }) => {

  return (
    <Calculation call={props.call} />
  )
}

const Calculation = ({call}: {call: CallManage}) => {

  return call.attributes.calculation ? <CalculationComponent calcn={call.attributes.calculation} /> : <></>
}