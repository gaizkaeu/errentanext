import { Button } from "@/components/ui/button";
import { useUpdateCallManageMutation } from "@/store/endpoints/calls";
import { CallManage } from "@/store/types/Call";

export const MarkAsDone = ({call}: {call: CallManage}) => {

  const [mutation] = useUpdateCallManageMutation();

  const markAsDone = () => {
    mutation({call_id: call.id, org_id: call.attributes.organization_id })
  }

  return (
    <Button onClick={markAsDone}>
      Done
    </Button>
  )
}