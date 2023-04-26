import { Organization } from "@/store/types/Organization";
import { Progress } from "../ui/progress";
import { useMemo } from "react";
import { Button } from "../ui/button";

export const ReviewsSummary = (props: { org: Organization }) => {

  const { ratings } = props.org.attributes

  const total = useMemo(() => {
    return ratings.five_star_count + ratings.four_star_count + ratings.three_star_count + ratings.two_star_count + ratings.one_star_count
  }, [props])

  return (
    <div className="p-2">
      <div className="flex items-center mt-4 w-full gap-4 p-3">
        <div className="text-center">
          <p className="text-3xl font-semibold">
            {total === 0 ? (
              <span className="text-slate-500 dark:text-slate-400">-</span>
            ) : (
              <span className="text-slate-500 dark:text-slate-400">{ratings.average}</span>
            )}
          </p>
          {total === 0 ? (
            <span className="text-slate-500 dark:text-slate-400">No data</span>
          ) : (
            <span className="text-slate-500 dark:text-slate-400">({total})</span>
          )}
        </div>
        <div className="flex-1 flex flex-col gap-2 ">
          <Progress value={(ratings.five_star_count * 100) / total} />
          <Progress value={(ratings.four_star_count * 100) / total} />
          <Progress value={(ratings.three_star_count * 100) / total} />
          <Progress value={(ratings.two_star_count * 100) / total} />
          <Progress value={(ratings.one_star_count * 100) / total} />
        </div>
      </div>

      <div>
        <Button size="sm" className="w-full">
          <svg className="w-4 h-4 mr-2" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg>
          {props.org.attributes.google_place_details?.rating} estrellas
        </Button>
      </div>

    </div>
  )
}