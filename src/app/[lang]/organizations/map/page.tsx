import { BottomSheetComponent, MapComponent, OrgListExploreMap, OrgViewExplore, OrganizationActionsSmall } from "@/components/organizations";
import { Button } from "@/components/ui/button";
import { Organization, Review } from "@/store/types/Organization";
import { Link } from "next-intl";
import queryString from "query-string";

export const dynamic = 'force-dynamic'
export const dynamicParams = true // true | false,
export const revalidate = true


const getOrgs = async (params?: string) => {
  const res = await fetch(process.env.NEXT_PUBLIC_API_BASE + "/api/v1/organizations?" + params ?? "", { next: { revalidate: 60 } });
  const data = await res.json();
  return data;
};

const getOrg = async (id: string) => {
  const res = await fetch(process.env.NEXT_PUBLIC_API_BASE + "/api/v1/organizations/" + id, { next: { revalidate: 60 } });
  const data = await res.json();
  return data.data;
};

const getOrgReview = async (id: string) => {
  const res = await fetch(process.env.NEXT_PUBLIC_API_BASE + "/api/v1/organizations/" + id + "/reviews", { next: { revalidate: 60 } });
  const data = await res.json();
  return data.data;
};

export default async function OrganizationIndexPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const orgs = await getOrgs(queryString.stringify(searchParams ?? {}));
  let org: Organization | undefined = undefined;
  let reviews: Review[] | undefined = undefined;

  if (searchParams && 'org' in searchParams) {
    org = await getOrg(searchParams['org'] as string);
    reviews = await getOrgReview(searchParams['org'] as string)
  }

  return (
    <>
      <div className="h-[calc(100%-4rem)]">
        <div className="grid grid-cols-7">
          <div className="max-lg:hidden lg:col-span-2 items-center h-screen overflow-y-auto">
            <OrgListExploreMap orgs={orgs.data} selected={org?.id} />
          </div>
          <BottomSheetComponent>
            {org && reviews ? (
              <OrgViewExplore org={org} reviews={reviews} />
            ) : (
              <OrgListExploreMap orgs={orgs.data} selected={org?.id} />
            )}
          </BottomSheetComponent>
          <div className="relative col-span-7 lg:col-span-5">
            <div className='absolute inset-x-0 top-20 lg:top-24 z-10'>
              <div className='w-fit mx-auto'>
                <Link href="/organizations">
                  <Button>
                    Modo lista
                  </Button>
                </Link>
              </div>
            </div>
            <div className='absolute lg:top-28 xl:top-32 2xl:top-38 left-4 z-10 h-screen'>
              {org && reviews && (
                <div className="animate-in slide-in-from-left h-4/6 bg-white dark:bg-slate-900 w-80 xl:w-96 2xl:w-[28rem] z-50 rounded-xl shadow-xl max-lg:hidden overflow-y-scroll">
                  <OrgViewExplore org={org} reviews={reviews} />
                </div>
              )}
            </div>
            <MapComponent orgs={orgs.data} />
          </div>
        </div>
      </div>
    </>
  )
}

