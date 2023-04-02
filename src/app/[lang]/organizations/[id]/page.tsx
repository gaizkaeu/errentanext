import { OrganizationExploreOthers, OrganizationOpen } from "@/components/organizations";
import { OrganizationActionsSmall } from "@/components/organizations/actions";
import { OrganizationLocation } from "@/components/organizations/org-location";
import { OrganizationReviews } from "@/components/organizations/org-review";
import { ReviewsSummary } from "@/components/reviews";
import { TagBigComponent } from "@/components/tags";
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
            <span className="font-light">
              <OrganizationOpen org={org} />
            </span>
          </h2>
        </div>
      </div>
      <div className="flex flex-col max-w-4xl mx-auto">
        <br />
        <section>
          <OrganizationActionsSmall org={org} />
        </section>
        <br />
        <section className="mx-auto">
          <div className="flex flex-row overflow-x-auto gap-3">
            {org.attributes.skill_list.map((i: string, index: number) => (
              <TagBigComponent key={index} tag={i} />
            ))}
          </div>
        </section>
        <br />
        <section className="h-[28rem]">
          <OrganizationLocation org={org} />
        </section>
        <br />
        <section>
          <h4 className="text-2xl font-semibold">Reseñas</h4>
          <div className="flex">
            <div className="flex-1">
              <ReviewsSummary reviews={org.attributes.ratings} />
            </div>
            <Button className="h-28 w-36">
              <ChatBubbleBottomCenterIcon className="w-8 h-8" />
              <span className="sr-only">Escribir reseña</span>
            </Button>
          </div>
          <br />
          <OrganizationReviews reviews={reviews} org={org} />
        </section>
        <br />
        <section>
          <OrganizationExploreOthers org={org} />
        </section>
      </div>
    </div>
  );
}