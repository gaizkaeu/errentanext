import { OrganizationReviews } from "@/store/types/Organization";
import { Progress } from "../ui/progress";
import { useMemo } from "react";

export const ReviewsSummary = (props: { reviews: OrganizationReviews }) => {

  const total = useMemo(() => {
    return props.reviews.five_star_count + props.reviews.four_star_count + props.reviews.three_star_count + props.reviews.two_star_count + props.reviews.one_star_count
  }, [props])

  return (
    <div>
      <div className="flex items-center mt-4 gap-4 p-3">
        <div className="text-center">
          <p className="text-3xl font-semibold">
            {total === 0 ? (
              <span className="text-slate-500 dark:text-slate-400">-</span>
            ) : (
              <span className="text-slate-500 dark:text-slate-400">{props.reviews.avg_rating}</span>
            )}
          </p>
          {total === 0 ? (
              <span className="text-slate-500 dark:text-slate-400">No data</span>
            ) : (
              <span className="text-slate-500 dark:text-slate-400">{props.reviews.avg_rating}</span>
            )}
        </div>
        <div className="flex-1 flex flex-col gap-2">
          <Progress value={(props.reviews.five_star_count * 100) / total} />
          <Progress value={(props.reviews.four_star_count * 100) / total} />
          <Progress value={(props.reviews.three_star_count * 100) / total} />
          <Progress value={(props.reviews.two_star_count * 100) / total} />
          <Progress value={(props.reviews.one_star_count * 100) / total} />
        </div>
      </div>

    </div>
  )

}