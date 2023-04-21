"use client";
import { useGetCalculationQuery } from "@/store/endpoints/calculations"
import { LoadingText } from "../ui/loading-text";

export const CalculationComponent = (props: { calculation_id: string }) => {

  const {data} = useGetCalculationQuery(props.calculation_id, {
    pollingInterval: 2000,
  })


  return (
    <div>
      <h1>Calculation {props.calculation_id}</h1>
      {data && (
        
        <div>
            {data.attributes.output.classification ? (
              <p>{data.attributes.output.classification} {data.attributes.price_result}€</p>
            ): 
            <LoadingText />}
        </div>
      
      )}
      </div>
  )
}