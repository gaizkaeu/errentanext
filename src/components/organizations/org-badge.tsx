import { Organization } from "@/store/types/Organization"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip"
import { ArrowTrendingUpIcon } from "@heroicons/react/24/outline"

export const OrganizationBadge = (props: { org: Organization }) => {

  return (
    <div className="flex items-center gap-2">
      {!props.org.attributes.visible && (
        <p className="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">No visible</p>
      )}
      {props.org.attributes.status == "featured_city" && (
        <FeaturedCityBadge />
      )}
      {props.org.attributes.status == "featured_province" && (
        <FeaturedProvinceBadge />
      )}
      {props.org.attributes.status == "featured_country" && (
        <FeaturedCountryBadge />
      )}
    </div>
  )
}

export const FeaturedCityBadge = () => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <p className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
          <ArrowTrendingUpIcon className="w-4 h-4 inline-block mr-1" />
        </p>
      </TooltipTrigger>
      <TooltipContent>
        <p>Destacado en la ciudad.</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
)

export const FeaturedProvinceBadge = () => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <p className="bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300">
          <ArrowTrendingUpIcon className="w-4 h-4 inline-block mr-1" />
        </p>
      </TooltipTrigger>
      <TooltipContent>
        <p>Destacado en la provincia.</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
)

export const FeaturedCountryBadge = () => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <p className="bg-purple-100 text-purple-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-purple-900 dark:text-purple-300">
          <ArrowTrendingUpIcon className="w-4 h-4 inline-block mr-1" />
        </p>
      </TooltipTrigger>
      <TooltipContent>
        <p>Destacado en el pais.</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
)


