import { Review } from "@/store/types/Organization";
import { CalendarDays } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export const ReviewComponent = (props: { review: Review }) => {
  return (

    <div className="flex justify-between space-x-4 bg-slate-50 dark:bg-slate-700 rounded-xl p-4">
      <div className="flex justify-between space-x-4">
        <Avatar>
          <AvatarImage src="https://github.com/vercel.png" />
          <AvatarFallback>VC</AvatarFallback>
        </Avatar>
        <div className="space-y-1">
          <h4 className="text-sm font-semibold">{props.review.attributes.user.first_name} {props.review.attributes.user.last_name}</h4>
          <p className="text-sm">
            {props.review.attributes.comment}
          </p>
          <div className="flex items-center pt-2">
            <CalendarDays className="mr-2 h-4 w-4 opacity-70" />{" "}
            <span className="text-xs text-slate-500 dark:text-slate-400">
              Joined December 2021
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
