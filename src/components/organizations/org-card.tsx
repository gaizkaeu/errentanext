import { Organization, calculateRating } from "@/store/types/Organization"
import { Separator } from "../ui/separator"


export const OrganizationCard = (props: { org: Organization }) => {

  return (
    <div className="transition-all animate-in fade-in-10 w-full lg:max-w-lg bg-slate-50 dark:bg-slate-700 rounded-xl h-54 p-4 shadow-md hover:-translate-y-1 hover:rounded-2xl">
      <div className="flex items-center mb-3">
        <h3 className="flex-1 text-lg font-light leading-tight tracking-tighter md:text-2xl lg:text-3xl lg:leading-[1.1]">
          {props.org.attributes.name}
        </h3>
        <p>
          A 2 km
        </p>
      </div>
      <Separator />
      <div className="flex gap-4 justify-center">
        <div className="p-1 hidden md:inline">
          <div className="stat-title">Declaraciones</div>
          <div className="stat-value">{props.org.attributes.tax_income_count}</div>
          <div className="stat-desc">21% mas que el mes pasado</div>
        </div>
        <div className="p-1">
          <div className="stat-title">Rating</div>
          <div className="stat-value text-green-400">{calculateRating(props.org.attributes.ratings).rating}</div>
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

const PriceRange = (props: { range: number }) => {

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