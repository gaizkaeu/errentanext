import { HomeHero } from "@/components/homepage/HomeHero";
import { OrganizationCard } from "@/components/organizations";
import { Button } from "@/components/ui/button";
import { Organization } from "@/store/types/Organization";
import { Link } from "next-intl";
import queryString from "query-string";

const getOrgs = async (params?: string) => {
  const res = await fetch(process.env.NEXT_PUBLIC_API_BASE + "/api/v1/organizations?" + params ?? "");
  const data = await res.json();
  return data;
};

export default async function IndexPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {

  const orgs = await getOrgs(queryString.stringify(searchParams ?? {}, { arrayFormat: "bracket" }));

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-7 justify-items-center">
        <div className="lg:col-span-2">
          <HomeHero />
        </div>
        <div className="lg:col-span-5">
          <div className="flex px-4 mx-auto w-full sm:px-6 lg:px-8">
            <div className="mx-auto">
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-bold leading-tight tracking-tighter md:text-5xl lg:text-6xl lg:leading-[1.1]">
                  Explorar
                </h2>
                <h3 className="text-2xl font-light leading-tight tracking-tighter md:text-5xl lg:text-6xl lg:leading-[1.1]">
                  Asesorías en Madrid.
                </h3>
              </div>

              <div className="grid grid-cols-1 w-full mt-5 justify-items-center gap-3">
                {orgs.data.map((org: Organization) => (
                  <Link href={`/organizations/${org.id}`} key={org.id}>
                    <OrganizationCard org={org} />
                  </Link>
                ))}
              </div>
              <div className="flex w-full mt-5 justify-center gap-2">
                <Link href="/organizations">
                  <Button>
                    Mostrar más
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
