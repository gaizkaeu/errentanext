import { GeneralCard, GeneralCardContent, GeneralCardHeading } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Calculator } from "@/store/types/Calculator"
import { ClockIcon } from "@heroicons/react/24/outline"

export const CalculatorComponent = ({ calculator }: { calculator: Calculator }) => {

  return (
    <GeneralCard className={cn(calculator.attributes.colors, "w-72")}>
      <div className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-gradient-to-r from-yellow-200 via-green-200 to-green-500"></div>
      <GeneralCardHeading className="text-white">
        <div className="mb-2 mt-4 text-lg font-medium">
          {calculator.attributes.topic_name}
        </div>
      </GeneralCardHeading>
      <GeneralCardContent className="text-white">
        <p className="text-sm leading-tight">
          {calculator.attributes.description}
        </p>
        <p className="flex items-center mt-3" title="Estimated time">
          <ClockIcon className="icon h-4 w-4 flex-shrink-0" />
          <span className="text-xs  ml-2" title="Estimated time">
            {calculator.attributes.estimated_time} minutos
          </span>
        </p>
      </GeneralCardContent>
    </GeneralCard>
  )

}