import { OrganizationTitle } from "@/components/organizations";
import { BackButton } from "@/components/ui/back-button";
import { SideNav } from "@/components/ui/side-nav";

export function generateStaticParams() {
  return [];
}

const getOrg = async (id: string) => {
  const res = await fetch(process.env.NEXT_PUBLIC_API_BASE + "/api/v1/organizations/" + id);
  const data = await res.json();
  return data.data;
};



export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: {id: string}
}) {
  const org = await getOrg(params.id);
  
  const links = [
  {
    title: "General",
    links: [
      {
        text: "Información",
        href: `/organization-manage/${params.id}/general`,
      },
      {
        text: "Precios",
        href: `/organization-manage/${params.id}/prices`,
      },
      {
        text: "Abogados",
        href: `/organization-manage/${params.id}/lawyers`,
      }
    ]
  },
  {
    title: "Balances",
    links: [
      {
        text: "Transacciones",
        href: `/organization-manage/${params.id}/transactions`,
      },
    ]
  }
]

  return (
    <div className="rounded-md bg-white transition-all dark:bg-slate-900">
      <div className="flex gap-4 items-center">
        <BackButton />
        <OrganizationTitle org={org} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 xl:grid-cols-5 mt-5">
        <SideNav sections={links} />

        <div className="col-span-3 md:border-l border-l-slate-200 dark:border-l-slate-700 xl:col-span-4 p-3">
          {children}
        </div>
      </div>
    </div>
  )
}
