import { GoogleReview, Review } from "@/store/types/Organization";
import { CalendarDays } from "lucide-react";
import moment from "moment";
import { ReviewText } from "./review-text";
import { ReviewStars } from "./review-stars";

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
        <p className="text-sm font-semibold">{props.review.attributes.user.first_name} {props.review.attributes.user.last_name}</p>
        <ReviewStars rating={props.review.attributes.rating} />
        <ReviewText text={props.review.attributes.comment} />
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

export const GoogleReviewComponent = (props: { review: GoogleReview }) => {
  return (
    <div className="flex justify-between space-x-4">
      <div className="space-y-1">
        <a href={props.review.author_url} className="text-sm font-semibold">{props.review.author_name}</a>
        <ReviewStars rating={props.review.rating} />
        <ReviewText text={props.review.text} />
        <div className="flex items-center pt-2">
          <CalendarDays className="mr-2 h-4 w-4 opacity-70" />{" "}
          <span className="text-xs text-slate-500 dark:text-slate-400">
            {props.review.relative_time_description}. Reseña de Google.
          </span>
        </div>
      </div>
    </div>
  )

}
