import { OrganizationBadge } from "../../organizations/org-badge";
import { Calculation } from "@/store/types/Calculator";
import { Skeleton } from "../../ui/skeleton";

export const CalculationComponent = (props: { calcn: Calculation, feature?: boolean, clickable?: boolean }) => {

  const { calcn, feature } = props
  const { organization } = calcn.attributes


  return (
    <div className={`${feature ? "from-fuchsia-600 to-pink-600 text-white h-64" : "from-muted/50 to-muted dark:from-midnight-800 dark:to-midnight-800"} bg-gradient-to-r rounded-lg p-3  flex`}>
      <div className="flex items-center group-hover:opacity-50 flex-1">
        <div className="flex-1">
          <h2 className="text-2xl font-bold">{organization.attributes.name}.</h2>
          {props.clickable && <p>Haz click para continuar</p>}
          <OrganizationBadge org={organization} />
        </div>
        {calcn.attributes.price_result ? (
          <h3 className="text-6xl font-extrabold">{calcn.attributes.price_result} <span className="font-light">€</span></h3>
        ) : (
          <Skeleton className="h-12 w-12 rounded-full bg-slate-400" />
        )}
      </div>
      <svg role="img" className="hidden sm:block self-center flex-shrink-0 mr-4 text-violet-500 transform-gpu scale-50 -translate-x-12 opacity-0 group-hover:scale-100 group-hover:translate-x-0 group-hover:opacity-100 transition-all ease-out duration-300" style={{pointerEvents: "none", width: "30px", height: "auto"}} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <g bufferred-rendering="static">
          <line x1="5" y1="12" x2="19" y2="12"></line>
          <polyline points="12 5 19 12 12 19"></polyline>
        </g>
      </svg>
    </div>
  )
}