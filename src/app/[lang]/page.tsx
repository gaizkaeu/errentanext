import { HomeHero } from "@/components/homepage/HomeHero";
import { IndexOrgs } from "@/components/organizations/Card";
import queryString from "query-string";

export const getOrgs = async (params?: string) => {
  const res = await fetch(process.env.API_BASE + "/api/v1/organizations?" + params ?? "");
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
          <IndexOrgs orgs={orgs.data}/>
        </div>
      </div>
    </>
  )
}
