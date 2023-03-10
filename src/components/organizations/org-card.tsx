import { Organization } from "@/store/types/Organization"
import { Separator } from "../ui/separator"
import { useMemo } from "react"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { OrganizationBadge, PriceRange, Rating } from "./org-badge"


const orgCardBackground = cva(
  "min-w-[25rem] transition-all animate-in fade-in-10 w-full lg:max-w-lg rounded-xl h-54 p-4 shadow-md hover:-translate-y-1 hover:rounded-2xl",
  {
    variants: {
      status: {
        disable:
          "bg-slate-50 dark:bg-slate-700",
        active:
          "bg-slate-200 dark:bg-slate-500",
      },
    },
    defaultVariants: {
      status: "disable",
    },
  }
)


export const OrganizationCard = (props: { org: Organization, selected?: boolean }) => {

  return (
    <div className={cn(orgCardBackground({ status: props.selected ? "active" : "disable" }))}>
      <div className="flex items-center mb-3">
        <h3 className="flex-1 text-lg font-light leading-tight tracking-tighter md:text-2xl lg:text-3xl lg:leading-[1.1]">
          {props.org.attributes.name}
        </h3>
        <OrganizationBadge org={props.org} />
        <p>
          {props.org.attributes.distance ? (
            <span>{props.org.attributes.distance.toFixed(2)} km</span>
          ) : (
            <span>
              {props.org.attributes.city}
            </span>
          )}
        </p>
      </div>
      <Separator />
      <div className="flex gap-4 justify-center">
        <div className="p-1">
          <div className="stat-title">Rating</div>
          <div className="stat-value ">
            <Rating rating={props.org.attributes.ratings.avg_rating} />
          </div>
        </div>
        <div className="p-1">
          <div className="stat-title">Rango de precio</div>
          <div className="stat-value">
            <PriceRange range={props.org.attributes.price_range} />
          </div>
        </div>
      </div>
    </div>
  )

}