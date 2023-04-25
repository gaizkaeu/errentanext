"use client";
import { Button } from "@/components/ui/button"
import { cn, useLocalizedMoment } from "@/lib/utils"
import { useGetOrganizationCalculatorsCalculationsQuery } from "@/store/endpoints/organizations"
import { Calculator, CalculatorManage } from "@/store/types/Calculator"
import { ArchiveBoxIcon, ArrowDownCircleIcon, ChevronDownIcon, ClockIcon } from "@heroicons/react/24/outline"
import { useState } from "react"
import { CalculationManageComponent } from "../calculation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalculatorGraphComponent } from "./calculator-graph";
import { CalculatorClassifications } from "./calculator-classifications";
import { GeneralCard, GeneralCardContent, GeneralCardHeading } from "@/components/ui/card";
import { CalculationManageCreateForm } from "../calculation/forms/calculation-create-form";

export const CalculatorManageComponent = (props: { calculator: CalculatorManage }) => {
  const { calculator } = props
  const [selected, setSelected] = useState(false)

  const { data } = useGetOrganizationCalculatorsCalculationsQuery({
    id: calculator.attributes.organization_id, calcr_id: calculator.id, filters: {
      'q[train_with_eq]': 'true',
    }
  }, {
    skip: !selected,
  })

  const s = useLocalizedMoment();

  return (
    <div className="divide-y-slate-200 mt-4 mb-4 divide-y rounded border border-slate-200 dark:border-midnight-700">
      <div className={`flex flex-col divide-y transition-all ease-in ${!selected && "hover:bg-slate-50 dark:hover:bg-midnight-800"}`}>
        <div className="border-l-2 border-transparent my-1 mx-1 px-3">
          <div className="flex flex-col md:flex-row md:justify-between py-3">
            <div className="flex flex-col gap-2 flex-1">
              <div className="flex items-center gap-4">
                <div className="inline-block w-fit">
                {calculator.attributes.calculator_status === "live" && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {calculator.attributes.calculator_status}
                  </span>
                )}
                </div>
                <p className="text-sm line-clamp-3">
                  {calculator.attributes.topic_name}
                </p>
              </div>
              <div className="ml-8 space-y-2">
                <div className="flex flex-col gap-2 md:flex-row md:gap-4 md:items-center">
                  <div className="flex items-center text-slate-400 min-w-0">
                    <p className="flex items-center" title="Branch">
                      <svg className="icon h-4 w-4 flex-shrink-0 stroke-slate-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor">
                        <title>Samples</title>
                        <path d="M3 3V13.2C3 14.8802 3 15.7202 3.32698 16.362C3.6146 16.9265 4.07354 17.3854 4.63803 17.673C5.27976 18 6.11984 18 7.8 18H15M15 18C15 19.6569 16.3431 21 18 21C19.6569 21 21 19.6569 21 18C21 16.3431 19.6569 15 18 15C16.3431 15 15 16.3431 15 18ZM3 8L15 8M15 8C15 9.65686 16.3431 11 18 11C19.6569 11 21 9.65685 21 8C21 6.34315 19.6569 5 18 5C16.3431 5 15 6.34315 15 8Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                      </svg>
                      <span className="text-xs text-slate-500 ml-2" title="Branch">
                        {calculator.attributes.sample_count} muestras de entrenamiento
                      </span>
                    </p>
                  </div>
                  <div className="flex items-center text-slate-400 min-w-0">
                    <p className="flex items-center" title="Git ref">
                      <ArchiveBoxIcon className="icon h-4 w-4 flex-shrink-0 stroke-slate-400" />
                      <span className="text-xs text-slate-500 ml-2" title="Git ref">
                        {Object.keys(calculator.attributes.classifications).length} clasificaciones
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="ml-8 flex flex-col justify-center gap-2 flex-shrink-0 mt-2 md:mt-0">
              <div className="flex items-center text-slate-400 min-w-0">
                <p className="flex items-center" title="Summarized at 2023-04-17 10:05:18 UTC">
                  <svg className="icon h-4 w-4 flex-shrink-0 stroke-slate-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor">
                    <path d="M21 10H3M16 2V6M8 2V6M7.8 22H16.2C17.8802 22 18.7202 22 19.362 21.673C19.9265 21.3854 20.3854 20.9265 20.673 20.362C21 19.7202 21 18.8802 21 17.2V8.8C21 7.11984 21 6.27976 20.673 5.63803C20.3854 5.07354 19.9265 4.6146 19.362 4.32698C18.7202 4 17.8802 4 16.2 4H7.8C6.11984 4 5.27976 4 4.63803 4.32698C4.07354 4.6146 3.6146 5.07354 3.32698 5.63803C3 6.27976 3 7.11984 3 8.8V17.2C3 18.8802 3 19.7202 3.32698 20.362C3.6146 20.9265 4.07354 21.3854 4.63803 21.673C5.27976 22 6.11984 22 7.8 22Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                  </svg>
                  <span className="text-xs text-slate-500 ml-2" title="Summarized at 2023-04-17 10:05:18 UTC">
                    último entrenamiento {s(calculator.attributes.last_trained_at).fromNow()}
                  </span>
                </p>
              </div>
              <Button variant="outline" className="w-5 h-5 rounded-full p-0 self-end" onClick={() => setSelected(!selected)}>
                <ChevronDownIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
          {selected && (
            <Tabs defaultValue="train">
              <TabsList>
                <TabsTrigger value="train">Entrenamiento</TabsTrigger>
                <TabsTrigger value="classifications">Clasificaciones</TabsTrigger>
                <TabsTrigger value="graph">Grafo</TabsTrigger>
                <TabsTrigger value="password">Cálculos realizados</TabsTrigger>
              </TabsList>
              <TabsContent value="train">
                <div>
                  <CalculationManageCreateForm calculator={calculator} org_id={calculator.attributes.organization_id} />
                  {data?.map((item) => (
                    <CalculationManageComponent key={item.id} calculation={item} org_id={calculator.attributes.organization_id} />
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="classifications">
                <CalculatorClassifications calculator={calculator} />
              </TabsContent>
              <TabsContent value="graph">
                <CalculatorGraphComponent dot={calculator.attributes.dot_visualization} />
              </TabsContent>

            </Tabs>
          )}
        </div>
      </div>
    </div>
  )
}

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