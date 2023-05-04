import { Separator } from "@/components/ui/separator";
import { Organization, Review } from "@/store/types/Organization";
import { ReviewComponentInline, ReviewsSummary } from "@/components/reviews";
import { OrganizationReviews } from "../org-review";

export const OrgViewExplore = (props: { org: Organization, reviews?: Review[] }) => {

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
      </div>
      <section>
        <p className="text-xl font-bold leading-tight tracking-tighter">
          Reseñas
        </p>
        <ReviewsSummary org={org} />
      </section>
    </div>
  );
}