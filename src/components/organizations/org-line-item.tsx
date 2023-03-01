import { Organization, calculateRating } from "@/store/types/Organization"
import { Separator } from "../ui/separator"
import { useMemo } from "react"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"


const orgLineBackground = cva(
  "transition-all animate-in fade-in-10 w-full lg:max-w-lg h-54 p-4",
  {
    variants: {
      status: {
        disable:
          "hover:bg-slate-100 dark:hover:bg-slate-600",
        active:
          "bg-slate-200 dark:bg-slate-500",
      },
    },
    defaultVariants: {
      status: "disable",
    },
  }
)


export const OrganizationLineItem = (props: { org: Organization, selected?: boolean }) => {

  const rating = useMemo(() => calculateRating(props.org.attributes.ratings), [props.org.attributes.ratings])

  return (
    <div className={cn(orgLineBackground({ status: props.selected ? "active" : "disable" }))}>
      <div className="flex items-center mb-3">
        <h3 className="flex-1 text-lg font-light leading-tight tracking-tighter md:text-2xl lg:text-3xl lg:leading-[1.1]">
          {props.org.attributes.name}
        </h3>
        <OrganizationBadge org={props.org} />
        <p>
          {props.org.attributes.distance && (
            <span>{props.org.attributes.distance.toFixed(2)} km</span>
            )}
        </p>
      </div>
      <div className="flex gap-4 justify-center">
        <div className="p-1">
          <div className="stat-title">Rating</div>
          <div className="stat-value text-green-400">{rating.rating}</div>
          <div className="stat-desc">Mejor que el 99%.</div>
        </div>
        <div className="p-1">
          <div className="stat-title">Rango de precio</div>
          <div className="stat-value">
            <PriceRange range={props.org.attributes.price_range} />
          </div>
          <div className="stat-desc">Mejor que el 99%.</div>
        </div>
      </div>
    </div>
  )

}

const OrganizationBadge = (props: { org: Organization }) => {

  return (
    <div className="flex items-center gap-2">
     {!props.org.attributes.visible && (
      <p className="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">No visible</p>
     )}
     {props.org.attributes.status =="not_subscribed" && (
      <p className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">Sin suscripción</p>
     )}
    </div>
  )
}

export const PriceRange = (props: { range: number }) => {

  switch (props.range) {
    case 0:
      return <span>€</span>
    case 1:
      return <span>€€</span>
    case 2:
      return <span>€€€</span>
    default:
      return <span>∅</span>
  }
}