import { CalculationManageComponent } from "@/components/calculate/calculation";
import { CallManage } from "@/store/types/Call";
import { MarkAsDone } from "./actions";
import { useGetCallManageQuery } from "@/store/endpoints/calls";

export const CallManageExpandedComponent = (props: { call: CallManage }) => {

  const {data} = useGetCallManageQuery({call_id: props.call.id, org_id: props.call.attributes.organization_id});

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data && 
          <Calculation call={data} />
        }
        <div>
          <p className="text-sm line-clamp-3">
            {props.call.attributes.first_name} {props.call.attributes.last_name}
          </p>
          <p className="text-sm line-clamp-3">
            {props.call.attributes.phone_number}
          </p>
          {!props.call.attributes.successful && (
            <MarkAsDone call={props.call} />
          )}
        </div>
    </div>
  )
}

const Calculation = ({call}: {call: CallManage}) => {

  return call.attributes.calculation ? 
  <div>
    {call.attributes.calculation?.attributes.name}
    <CalculationManageComponent calculation={call.attributes.calculation} org_id={call.attributes.organization_id} />
  </div>
    : <></>
}

