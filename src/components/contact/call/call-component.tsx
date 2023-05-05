import { CallManage } from "@/store/types/Call";
import { PhoneIcon } from "@heroicons/react/24/outline";
import { CallTimeComponent } from "./call-time";
import { CallManageExpandedComponent } from "./call-expanded-component";
import { ListCard, ListCardHeading, ListCardHeadingElement } from "@/components/ui/list-card";
import { Badge } from "@/components/ui/badge";

export const CallManageComponent = (props: { call: CallManage }) => {
  const { call } = props;

  return (
    <ListCard>
      <ListCardHeading
        rightContent={
          <div className="flex flex-col gap-2 md:flex-row md:gap-4 md:items-center">
            <div className="flex items-center text-slate-400 min-w-0">
              <p className="flex items-center" title="Branch">
                {call.attributes.successful ? (
                  <Badge>Realizada</Badge>
                ) : (
                  <CallTimeComponent call_time={call.attributes.call_time} />
                )}
              </p>
            </div>
          </div>
        }
        expandedcontent={
          <CallManageExpandedComponent call={call} />
        }
      >
        <ListCardHeadingElement>
          <div className="inline-block w-fit">
            <PhoneIcon className="h-6 w-6 text-slate-400" />
          </div>
          <p className="text-sm line-clamp-3">
            {call.attributes.first_name} {call.attributes.last_name}
          </p>
        </ListCardHeadingElement>
      </ListCardHeading>
    </ListCard>
  )
}