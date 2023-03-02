import { BottomSheetComponent, MapComponent, OrganizationActionsSmall, OrganizationExplore, OrganizationLineItem } from "@/components/organizations";
import { ReviewComponentInline, ReviewsSummary } from "@/components/reviews";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Organization, Review } from "@/store/types/Organization";
import { XMarkIcon } from "@heroicons/react/24/outline";
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
  const res = await fetch(process.env.NEXT_PUBLIC_API_BASE + "/api/v1/organizations/" + id);
  const data = await res.json();
  return data.data;
};

const getOrgReview = async (id: string) => {
  const res = await fetch(process.env.NEXT_PUBLIC_API_BASE + "/api/v1/organizations/" + id + "/reviews");
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
      <div className="h-screen">
        <div className="absolute inset-0 z-0">
          <div className="grid grid-cols-7">
            <div className="max-lg:hidden lg:col-span-2 items-center pt-24 h-screen overflow-y-auto">
              <OrganizationList orgs={orgs.data} selected={org?.id} />
            </div>
            <BottomSheetComponent>
              {org && reviews ? (
                <OrgViewContent org={org} reviews={reviews} />
              ) : (
                <OrganizationList orgs={orgs.data} selected='' />
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
              <div className='absolute lg:top-32 xl:top-40 2xl:top-44 left-4 z-10 h-64'>
                {org && reviews && (
                  <div className="animate-in slide-in-from-left h-[32rem] bg-white dark:bg-slate-900 w-80 z-50 rounded-xl shadow-xl max-lg:hidden">
                    <OrgViewContent org={org} reviews={reviews} />
                  </div>
                )}
              </div>
              <MapComponent orgs={orgs.data} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}


const OrganizationList = (props: { orgs: Organization[], selected?: string }) => {

  return (
    <>
      <div className='p-3'>
        <p className='text-xl font-bold my-3'>Más de 50 asesorías</p>
        <OrganizationExplore />
      </div>
      <div className='grid grid-cols-1 divide-y border border-t border-b dark:border-slate-700 dark:divide-slate-700'>
        {props.orgs.map((org: Organization) => (
          <Link href={`/organizations/map?org=${org.id}`} key={org.id}>
            <OrganizationLineItem org={org} selected={props.selected == org.id} />
          </Link>
        ))}
      </div>
    </>
  )
}

const OrgViewContent = (props: { org: Organization, reviews: Review[] }) => {

  const { org, reviews } = props;

  return (
    <div className="p-3 grid grid-cols-1 gap-4">
      <div className="flex">
        <div className="flex-1">
          <p className="text-2xl font-bold leading-tight tracking-tighter">
            {org.attributes.name}
          </p>
          <p className="text-xl font-bold leading-tight tracking-tighter">
            Asesoría en <span className="font-light">{org.attributes.city}</span>.
          </p>
        </div>
        <div>
          <Link href={`/organizations/map`}>
            <XMarkIcon className="h-6" />
          </Link>
        </div>
      </div>
      <Separator />
      <section>
        <OrganizationActionsSmall org={org} />
      </section>
      <Separator />
      <section>
        <p className="text-xl font-bold leading-tight tracking-tighter">
          Reseñas
        </p>
        <ReviewsSummary reviews={org.attributes.ratings} />
        {reviews.map((i, index) => {
          return (
            <ReviewComponentInline review={i} key={index} />
          )
        })}
      </section>
    </div>
  );
}