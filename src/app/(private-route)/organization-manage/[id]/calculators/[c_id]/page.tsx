"use client";
import { Data, TrainButton } from "@/components/calculate";
import { CalculationManageCreateForm } from "@/components/calculate/calculation/forms";
import { CalculatorClassifications } from "@/components/calculate/calculator/calculator-classifications";
import { CalculatorGraphComponent } from "@/components/calculate/calculator/calculator-graph";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetCalculatorManageQuery } from "@/store/endpoints/calculations";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";


export default function Page({ params }: { params: { id: string, c_id: string } }) {

  const { data: calculator } = useGetCalculatorManageQuery({ org_id: params.id, calcr_id: params.c_id }, {
    pollingInterval: 10000,
  });

  return calculator ? (
    <>
      <Link href={`/organization-manage/${calculator.attributes.organization_id}/calculators`}>
        <p className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-100">
          <ArrowLeftIcon className="h-4 w-4 inline-block" />
          <span className="ml-2">Volver</span>
        </p>
      </Link>
      <div className="flex items-center gap-4">
        <div className="inline-block w-fit">
          {calculator.attributes.calculator_status === "live" ? (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              {calculator.attributes.calculator_status}
            </span>
          ) : (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-600">
              {calculator.attributes.calculator_status}
            </span>
          )}
        </div>
        <h3 className="text-xl line-clamp-3 font-bold">
          {calculator.attributes.topic_name}
        </h3>
      </div>
      <br />
      <Tabs defaultValue="train">
        <TabsList>
          <TabsTrigger value="train">Añadir datos</TabsTrigger>
          <TabsTrigger value="classifications">Clasificaciones</TabsTrigger>
          <TabsTrigger value="graph">Grafo</TabsTrigger>
          <TabsTrigger value="calculations">Cálculos realizados</TabsTrigger>
        </TabsList>
        <TabsContent value="train">
          <div>
            <CalculationManageCreateForm calculator={calculator} org_id={calculator.attributes.organization_id} />
          </div>
        </TabsContent>
        <TabsContent value="classifications">
          <CalculatorClassifications calculator={calculator} />
        </TabsContent>
        <TabsContent value="graph">
          <CalculatorGraphComponent dot={calculator.attributes.dot_visualization} />
        </TabsContent>
        <TabsContent value="calculations">
          <Data calculator={calculator} />
          <TrainButton calculator={calculator} />
        </TabsContent>
      </Tabs>
    </>
  ) : <></>
}