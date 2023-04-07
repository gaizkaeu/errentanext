import { ContactForm } from "@/components/contact/forms";
import { OrganizationExploreOthers, OrganizationOpen } from "@/components/organizations";
import { OrganizationActionsSmall } from "@/components/organizations/actions";
import { ContactButton } from "@/components/organizations/actions/org-contact";
import { OrganizationLocation } from "@/components/organizations/org-location";
import { OrganizationReviews } from "@/components/organizations/org-review";
import { ReviewsSummary } from "@/components/reviews";
import { TagBadge } from "@/components/tags";
import { BackButton } from "@/components/ui/back-button";
import { Button } from "@/components/ui/button";
import { ChatBubbleBottomCenterIcon } from "@heroicons/react/24/outline";

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

export default async function Page({ params }: { params: { id: string } }) {
  const orgProm = getOrg(params.id);
  const reviewProm = getOrgReview(params.id);

  const [org, reviews] = await Promise.all([orgProm, reviewProm]);

  return org && (
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
      <div className="flex flex-col max-w-5xl mx-auto">
        <section>
          <div className="flex max-md:flex-col gap-3">
            <div className="h-64 w-64 mx-auto bg-gray-100 dark:bg-gray-800 rounded-lg" />
            <div className="flex-1">
              <blockquote className="text-sm italic font-semibold text-gray-900 dark:text-white">
                <svg aria-hidden="true" className="w-10 h-10 text-gray-400 dark:text-gray-600" viewBox="0 0 24 27" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z" fill="currentColor" /></svg>
                <p>{org.attributes.description}</p>
              </blockquote>
              <br />
              <OrganizationActionsSmall org={org} />
              <br />
              <p className="font-light text-xl">
                <OrganizationOpen org={org} />
              </p>
            </div>
          </div>
        </section>
        <br />
        <section>
          <div className="w-fit mx-auto">
            <ContactForm org={org} />
          </div>
        </section>
        <br />
        <section>
          <h4 className="text-2xl font-semibold">Reseñas</h4>
          <div className="grid grid-cols-1 md:grid-cols-7 ">
            <div className="md:col-span-2">
              <ReviewsSummary reviews={org.attributes.ratings} />
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
          <OrganizationExploreOthers org={org} />
        </section>
      </div>
    </div>
  );
}