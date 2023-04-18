import { CallCreateForm } from "@/components/contact";
import { ContactSignInComponent } from "@/components/contact/forms";
import { OrganizationExploreOthers, OrganizationOpen } from "@/components/organizations";
import { OrgContactButton, OrganizationActionsSmall } from "@/components/organizations/actions";
import { OrganizationLocation } from "@/components/organizations/org-location";
import { OrganizationReviews } from "@/components/organizations/org-review";
import { ReviewsSummary } from "@/components/reviews";
import { TagBadge } from "@/components/tags";
import { BackButton } from "@/components/ui/back-button";

export const dynamic = 'force-dynamic'
export const dynamicParams = true

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

export async function generateMetadata({ params }: { params: { id: string } }) {
  const org = await getOrg(params.id);
  return {
    title: org.attributes.name,
  };
}

export default async function Page({ params }: { params: { id: string } }) {
  const orgProm = getOrg(params.id);
  const reviewProm = getOrgReview(params.id);

  const [org, reviews] = await Promise.all([orgProm, reviewProm]);

  return org && (
    <>
      <OrganizationOpen org_id={org.id} />
      <div className="w-full md:p-4 p-1">
        <div className="flex items-center gap-4">
          <BackButton href="/organizations" />
          <div>
            <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-5xl lg:text-6xl lg:leading-[1.1]">
              {org.attributes.name}
            </h1>
            <h2 className="text-xl font-bold leading-tight tracking-tighter md:text-3xl lg:text-4xl lg:leading-[1.1]">
              Asesoría en <span className="font-light">{org.attributes.city}</span>.{" "}
            </h2>
          </div>
        </div>
        <br />
        <div className="grid grid-cols-1 md:grid-cols-7 gap-3 max-w-7xl mx-auto">
          <div className="flex flex-col max-w-5xl col-span-5">
            <section>
              <div className="flex max-md:flex-col gap-3">
                <div className="bg-slate-50 rounded-lg w-32 h-32 mx-auto">
                  <img alt="Logo" src={org.attributes.logo_url} className="rounded-lg m-auto h-[128px]" width="128px" height="128px" />
                </div>
                <div className="flex-1">
                  <blockquote className="text-sm italic font-semibold text-gray-900 dark:text-white">
                    <svg aria-hidden="true" className="w-10 h-10 text-gray-400 dark:text-gray-600" viewBox="0 0 24 27" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z" fill="currentColor" /></svg>
                    <p>{org.attributes.description}</p>
                  </blockquote>
                  <br />
                  <OrganizationActionsSmall org={org} />
                </div>
              </div>
            </section>
            <br />
            <section>
              <div className="w-fit mx-auto">
                <ContactSignInComponent org={org} />
              </div>
            </section>
            <br />
            <section>
              <div className="grid grid-cols-1 md:grid-cols-7 space-y-3">
                <div className="md:col-span-2">
                  <h4 className="text-2xl font-semibold">Reseñas</h4>
                  <ReviewsSummary org={org} />
                  <br />
                  <p className="text-2xl font-semibold">Servicios</p>
                  <br />
                  <div className="flex">
                    {org.attributes.skill_list.map((tag: string) => (
                      <TagBadge key={tag} tag={tag} />
                    ))}
                  </div>
                </div>
                <div className="md:col-span-5">
                  <OrganizationReviews reviews={reviews} org={org} />
                </div>
              </div>
            </section>
            <br />
            <section className="h-[20rem]">
              <OrganizationLocation org={org} />
            </section>
            <br />
            <section>
            </section>
          </div>
          <div className="max-md:hidden col-span-2">
            <CallCreateForm org={org} />
            <br />
            <OrganizationExploreOthers org={org} />
          </div>
        </div>
      </div>
    </>
  );
}