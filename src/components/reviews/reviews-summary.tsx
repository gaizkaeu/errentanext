import { RawRatingValues, calculateRating } from "@/store/types/Organization";
import { Progress } from "../ui/progress";
import { useMemo } from "react";

export const ReviewsSummary = (props: { reviews: RawRatingValues }) => {

  const total = useMemo(() => {
    return props.reviews.five_star_count + props.reviews.four_star_count + props.reviews.three_star_count + props.reviews.two_star_count + props.reviews.one_star_count
  }, [props])
  const avg = useMemo(() => {
    return calculateRating(props.reviews)
  }, [props])

  return (
    <div>
      <div className="flex items-center mt-4 gap-4 p-3">
        <div>
          <p className="text-3xl font-semibold">{avg.rating}</p>
          <p className="text-slate-700 text-center dark:text-slate-50">({avg.count})</p>
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