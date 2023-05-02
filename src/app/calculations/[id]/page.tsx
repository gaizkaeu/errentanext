"use client";
import { CalculationComponent } from "@/components/calculate";
import { CallCreateForm } from "@/components/contact";
import { OrgViewExplore } from "@/components/organizations";
import { BackButton } from "@/components/ui/back-button";
import { Button } from "@/components/ui/button";
import { GeneralCard, GeneralCardContent, GeneralCardHeading } from "@/components/ui/card";
import { useCreateBulkFromCalculationMutation, useGetBulkCalculationQuery, useGetCalculationQuery } from "@/store/endpoints/calculations";
import { Calculation } from "@/store/types/Calculator";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export default function Page({ params }: { params: { id: string } }) {

  const [selected, setSelected] = useState<Calculation | null>(null);

  const { data } = useGetCalculationQuery(params.id, {
    pollingInterval: 2000,
  })


  return (
    <>
      <div className="w-full md:p-4 p-1">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-5xl lg:text-6xl lg:leading-[1.1]">
              Mi estimación
            </h1>
            <p className="text-xl font-light leading-tight tracking-tighter md:text-2xl lg:text-3xl lg:leading-[1.1]">
              {data?.attributes.name}
            </p>
          </div>
        </div>
        <br />
        {data && (
          <div className="grid grid-cols-1 md:grid-cols-7 gap-4 max-w-7xl mx-auto">
            <div className="md:col-span-2">
              <GeneralCard variant="slate" className="h-fit w-full">
                <GeneralCardHeading className="h-fit">
                  <h4 className="text-2xl font-bold">Mándamelo</h4>
                </GeneralCardHeading>
                <GeneralCardContent>
                  <p className="text-xl font-light leading-tight tracking-tighter md:text-xl lg:text-2xl lg:leading-[1.1]">
                    Guarda tu presupuesto para poder acceder a él en cualquier momento.
                  </p>
                  <br />
                  <Button>
                    Correo electrónico
                  </Button>
                </GeneralCardContent>
              </GeneralCard>
              <div className="max-md:hidden">
                <OrgViewExplore org={data.attributes.organization} />
              </div>
            </div>
            <div className="md:col-span-5">
              {selected ? (
                <div className="p-2 bg-slate-50 dark:bg-midnight-800 rounded-lg">
                  <Button size="sm" onClick={() => setSelected(null)}>
                    <ArrowLeftIcon className="h-4 w-4" aria-hidden="true" />
                    <span className="sr-only">Back</span>
                  </Button>
                  <div>
                    <CallCreateForm org={data.attributes.organization} calc_id={data.id} />
                  </div>
                </div>
              ) : (
                <>
                  <ClickalbeCalculation calc={data} featured={true} setSelected={setSelected} />
                  <br />
                  {data.attributes.bulk_calculation_id ? (
                    <>
                      <h4 className="text-2xl font-bold mb-3">Presupuestos en <span className="font-light">asesorías similares</span>.</h4>
                      <BulkCalculation id={data.attributes.bulk_calculation_id} setSelected={setSelected} />
                    </>
                  ) : (
                    <GenerateBulkButton id={data.id} />
                  )}
                </>
              )}
              <div className="md:hidden">
                <OrgViewExplore org={data.attributes.organization} />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

const ClickalbeCalculation = ({ calc, featured, setSelected }: { calc: Calculation, featured: boolean, setSelected: (arg: Calculation) => void }) => {
  return (
    <div onClick={() => setSelected(calc)} className="group cursor-pointer hover:scale-95 transform-gpu transition-transform ease-out duration-200 focus-within:border-purple-400 focus-within:ring focus-within:ring-purple-300">
      <CalculationComponent calcn={calc} feature={featured} clickable={true} />
    </div>
  )
}

const BulkCalculation = ({ id, setSelected }: { id: string, setSelected: (arg: Calculation) => void }) => {
  const { data } = useGetBulkCalculationQuery(id, {
    pollingInterval: 2000,
  })

  return (
    <div className="grid grid-cols-1 space-y-2">
      {data?.map((calcn) => (
        <ClickalbeCalculation calc={calcn} key={calcn.id} featured={false} setSelected={setSelected} />
      ))}
    </div>
  )
}

const GenerateBulkButton = ({ id }: { id: string }) => {

  const [mutation, { isLoading }] = useCreateBulkFromCalculationMutation()

  return (
    <Button onClick={() => mutation(id)} disabled={isLoading}>
      Ver presupuestos similares
    </Button>
  )
}