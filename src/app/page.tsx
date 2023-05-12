import { HomeHero } from "@/components/homepage/home-hero";
import { OrgHomepageSearch, OrganizationCard } from "@/components/organizations";
import { TagComponent } from "@/components/tags";
import { Button } from "@/components/ui/button";
import { Organization } from "@/store/types/Organization";
import Link from "next/link";
import queryString from "query-string";
import { Suspense } from "react";

export const dynamicParams = true // true | false,
export const revalidate = true
export const dynamic = 'force-dynamic'


const getOrgs = async (params?: string) => {
  const res = await fetch(process.env.NEXT_PUBLIC_API_BASE + "/api/v1/organizations?" + params ?? "", { next: { revalidate: 1 } });
  const data = await res.json();
  return data;
};

const getSkills = async (params?: string) => {
  const res = await fetch(process.env.NEXT_PUBLIC_API_BASE + "/api/v1/skills_tags");
  const data = await res.json();
  return data;
};

export default async function IndexPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {

  const orgsProm = await getOrgs(queryString.stringify(searchParams ?? {}, { arrayFormat: "bracket" }));
  const skillsProm = await getSkills();

  const [orgs, skills] = await Promise.all([orgsProm, skillsProm]);

  return (
    <>
      <div className="grid grid-cols-1 justify-items-center">
        <HomeHero />
        <div className="w-full px-2 lg:p-8 max-w-7xl">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold leading-tight tracking-tighter md:text-5xl lg:text-6xl lg:leading-[1.1]">
              Explorar
            </h2>
            <h3 className="text-2xl whitespace-nowrap font-light leading-tight tracking-tighter md:text-5xl lg:text-6xl lg:leading-[1.1]">
              Asesorías en
            </h3>
            <Suspense>
              <OrgHomepageSearch />
            </Suspense>
          </div>
          <div className="flex gap-2 mt-2 overflow-x-auto">
            {skills && skills.data && skills.data.map((skill: any) => (
              <TagComponent tag={skill.attributes.name} key={skill.id} />
            ))}
          </div>
          <br />
          <div className="grid grid-cols-1 space-y-2 justify-items-center">
            {orgs && orgs?.data.map((org: Organization) => (
              <Link href={`/organizations/${org.id}`} key={org.id} className="w-full lg:max-w-lg">
                <OrganizationCard org={org} />
              </Link>
            ))}
          </div>
          <div className="flex w-full mt-5 justify-center gap-2">
            <Link href={`/organizations?${queryString.stringify(searchParams ?? {}, { arrayFormat: "bracket" })}`}>
              <Button>
                Mostrar más
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
