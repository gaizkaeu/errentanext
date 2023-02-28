import { OrganizationExploreMap } from "@/components/organizations/explore";
import queryString from "query-string";

export const dynamicParams = true // true | false,
export const revalidate = true
export const dynamic = 'force-dynamic'


const getOrgs = async (params?: string) => {
  const res = await fetch(process.env.NEXT_PUBLIC_API_BASE + "/api/v1/organizations?" + params ?? "", { next: { revalidate: 60 } });
  const data = await res.json();
  return data;
};

export default async function OrganizationIndexPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const orgs = await getOrgs(queryString.stringify(searchParams ?? {}));

  return (
    <>
      <div className="h-screen">
        <div className="absolute inset-0 z-0">
          <OrganizationExploreMap orgs={orgs.data} />
        </div>
      </div>
    </>
  )
}
