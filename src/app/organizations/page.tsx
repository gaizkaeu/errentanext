import { OrganizationExplore } from "@/components/organizations/explore";
import { OrganizationList } from "@/components/organizations/lists/org-list-explore";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import Link from "next/link";
import queryString from "query-string";
import { Suspense } from "react";

export const dynamicParams = true // true | false,
export const revalidate = true
export const dynamic = 'force-dynamic'

const getOrgs = async (params?: string) => {
  const res = await fetch(process.env.NEXT_PUBLIC_API_BASE + "/api/v1/organizations?" + params ?? "", { next: { revalidate: 60 } });
  const data = await res.json();
  return data;
};

export const metadata: Metadata = {
  title: "BUSCADOR",
  description: "Encuentra tu asesoría de confianza.",
}

export default async function OrganizationIndexPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const orgs = await getOrgs(queryString.stringify(searchParams ?? {}));

  return (
    <div className="flex px-4 w-full sm:px-6 lg:px-8 mt-3 md:mt-12">
      <div className="lg:mx-auto max-w-xl w-full space-y-2">
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-bold leading-tight tracking-tighter md:text-5xl lg:text-6xl lg:leading-[1.1]">
            Explorar
          </h2>
          <h3 className="text-2xl font-light leading-tight tracking-tighter md:text-5xl lg:text-6xl lg:leading-[1.1]">
            Asesorías.
          </h3>
        </div>
        <div className="space-y-3">
          <Suspense>
            <OrganizationExplore />
          </Suspense>
          <div className="grid grid-cols-1 gap-4">
            {orgs && (
              <OrganizationList orgs={orgs.data} />
            )}
            <div className='inset-x-0 bottom-5 z-10 sticky'>
              <div className='w-fit mx-auto'>
                <Link href="/organizations/map">
                  <Button>
                    Ver en mapa
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
