import { OrganizationTitle } from "@/components/organizations";
import { SideNav } from "@/components/organizations/manage/org-manage-side-nav"
import { BackButton } from "@/components/ui/back-button";

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
  const org= await getOrg(params.id);

  return (
    <div className="rounded-md bg-white transition-all dark:bg-slate-900">
      <div className="flex gap-4 items-center">
        <BackButton />
        <OrganizationTitle org={org} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 xl:grid-cols-5 mt-5">
        <SideNav id={params.id} />

        <div className="col-span-3 md:border-l border-l-slate-200 dark:border-l-slate-700 xl:col-span-4 p-3">
          {children}
        </div>
      </div>
    </div>
  )
}
