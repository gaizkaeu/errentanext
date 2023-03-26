import { LawyerProfile } from "@/store/types/LawyerProfile";
import { LawyerStatusBadge } from "./law-status";
import { LawyerEditForm } from "./forms";

export const LawyerProfileComponent = (props: {law: LawyerProfile}) => {

  return (
    <div className="lg:p-4 p-2 rounded-lg bg-blue-100 dark:bg-blue-900 max-w-xl">
      <div className="flex gap-3 items-center">
        <div>
          {props.law.attributes.avatar_url ? (
            <img className="w-16 h-16 rounded-full" src={props.law.attributes.avatar_url} alt="avatar" />
          ) : (
            <div className="w-16 h-16 rounded-full bg-blue-800 dark:bg-blue-700 text-center">
              <p style={{fontSize:"43px"}}>	&#128556;</p>
            </div>
          )}
        </div>
        <div className="flex-1">
          <p className="text-lg font-semibold">{props.law.attributes.first_name} <span className="font-light">{props.law.attributes.last_name}</span>.</p>
          <LawyerStatusBadge lawyer={props.law.attributes}/>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 mt-2">
        {props.law.attributes.skill_list.map((skill, index) => (
          <div key={index} className="px-2 py-1 text-xs font-medium leading-4 text-blue-800 bg-blue-200 rounded-full">
            <p className="capitalize">{skill}</p>
            </div>
        ))}
      </div>
    </div>
  )


}