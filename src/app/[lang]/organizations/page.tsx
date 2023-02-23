import { OrganizationExplore } from "@/components/organizations/explore";
import { OrganizationCard } from "@/components/organizations/org-card";
import { Organization } from "@/store/types/Organization";
import { Link } from "next-intl";
import queryString from "query-string";

export const dynamic = 'force-dynamic'

const getOrgs = async (params?: string) => {
  const res = await fetch(process.env.NEXT_PUBLIC_API_BASE + "/api/v1/organizations?" + params ?? "");
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
    <div className="flex px-4 mx-auto w-full sm:px-6 lg:px-8 mt-8 md:mt-12">
      <div className="mx-auto space-y-2">
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-bold leading-tight tracking-tighter md:text-5xl lg:text-6xl lg:leading-[1.1]">
            Explorar
          </h2>
          <h3 className="text-2xl font-light leading-tight tracking-tighter md:text-5xl lg:text-6xl lg:leading-[1.1]">
            Asesorías.
          </h3>
        </div>
        <div className="space-y-3">
          <OrganizationExplore />
          <div className="grid grid-cols-1 gap-4">
            {orgs && orgs?.data.map((org: Organization) => (
              <Link href={`/organizations/${org.id}`} key={org.id} className="w-full lg:max-w-lg">
                <OrganizationCard org={org} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
