import { Review } from "@/store/types/Organization";
import { CalendarDays } from "lucide-react";
import moment from "moment";
import { StarIcon } from "@heroicons/react/24/outline";

export const ReviewComponent = (props: { review: Review }) => {
  return (

    <div className="flex justify-between space-x-4 bg-slate-50 dark:bg-slate-700 rounded-xl p-4">
      <ReviewContent review={props.review} />
    </div>
  );
}

export const ReviewComponentInline = (props: { review: Review }) => {
  return (
    <div className="flex justify-between space-x-4 rounded-xl p-4">
      <ReviewContent review={props.review} />
    </div>
  )
}

const ReviewContent = (props: { review: Review }) => {

  return (
    <div className="flex justify-between space-x-4">
      <div className="space-y-1">
        <p className="text-sm font-semibold">{props.review.attributes.user.first_name} {props.review.attributes.user.last_name}{" "}
        | {props.review.attributes.rating} <StarIcon className="h-4 inline" /></p>
        <p className="text-sm">
          {props.review.attributes.comment}
        </p>
        <div className="flex items-center pt-2">
          <CalendarDays className="mr-2 h-4 w-4 opacity-70" />{" "}
          <span className="text-xs text-slate-500 dark:text-slate-400">
            {moment(props.review.attributes.created_at).fromNow()}
          </span>
        </div>
      </div>
    </div>
  )

}