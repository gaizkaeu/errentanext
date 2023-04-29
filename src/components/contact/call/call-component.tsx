"use client";
import { useLocalizedMoment } from "@/lib/utils";
import { CallManage } from "@/store/types/Call";
import { PhoneIcon } from "@heroicons/react/24/outline";
import { CallTimeComponent } from "./call-time";
import { CallManageExpandedComponent } from "./call-expanded-component";
import { ListCard, ListCardHeading, ListCardHeadingBadge, ListCardHeadingBadgeItem, ListCardHeadingElement } from "@/components/ui/list-card";

export const CallManageComponent = (props: { call: CallManage }) => {
  const { call } = props;

  const s = useLocalizedMoment();

  return (
    <ListCard>
      <ListCardHeading
        rightContent={
          <div className="flex flex-col gap-2 md:flex-row md:gap-4 md:items-center">
            <div className="flex items-center text-slate-400 min-w-0">
              <p className="flex items-center" title="Branch">
                <span className="text-xs text-slate-500 ml-2" title="Branch">
                  Programada para {" "}
                  <CallTimeComponent call_time={call.attributes.call_time} />
                </span>
              </p>
            </div>
          </div>
        }
        expandedContent={
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
        <ListCardHeadingBadge>
          <ListCardHeadingBadgeItem>
            <p className="flex items-center" title="Branch">
              <svg className="icon h-4 w-4 flex-shrink-0 stroke-slate-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor">
                <title>Samples</title>
                <path d="M3 3V13.2C3 14.8802 3 15.7202 3.32698 16.362C3.6146 16.9265 4.07354 17.3854 4.63803 17.673C5.27976 18 6.11984 18 7.8 18H15M15 18C15 19.6569 16.3431 21 18 21C19.6569 21 21 19.6569 21 18C21 16.3431 19.6569 15 18 15C16.3431 15 15 16.3431 15 18ZM3 8L15 8M15 8C15 9.65686 16.3431 11 18 11C19.6569 11 21 9.65685 21 8C21 6.34315 19.6569 5 18 5C16.3431 5 15 6.34315 15 8Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
              </svg>
              <span className="text-xs text-slate-500 ml-2" title="Branch">
                asd
              </span>
            </p>
          </ListCardHeadingBadgeItem>
        </ListCardHeadingBadge>
      </ListCardHeading>
    </ListCard>
  )
}