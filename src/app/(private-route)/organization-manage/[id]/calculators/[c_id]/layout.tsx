"use client";
import { SideNav } from "@/components/ui/side-nav";
import { useGetCalculatorManageQuery } from "@/store/endpoints/calculations";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export function generateStaticParams() {
  return [];
}


export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { id: string, c_id: string }
}) {
  const links = [
    {
      title: "Calculador",
      links: [
        {
          text: "Insertar datos",
          href: `/organization-manage/${params.id}/calculators/${params.c_id}/insert`,
        },
        {
          text: "Grafo",
          href: `/organization-manage/${params.id}/calculators/${params.c_id}/graph`,
        },
        {
          text: "Data",
          href: `/organization-manage/${params.id}/calculators/${params.c_id}/data`,
        },
      ]
    },
  ]

  const { data: calculator } = useGetCalculatorManageQuery({ org_id: params.id, calcr_id: params.c_id }, {
    pollingInterval: 10000,
  });


  return (
    <>
      <div className="md:flex gap-1">
        <div className="bg-slate-50 dark:bg-midnight-700 rounded-lg px-3">
          <SideNav sections={links} />
        </div>

        <div className="flex-1">
          {calculator && (
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
            </>
          )}
          {children}
        </div>
      </div>
    </>
  )
}
