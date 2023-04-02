import { Organization, Review } from "@/store/types/Organization";
import { GoogleReviewComponent, ReviewComponent } from "../reviews";

export const OrganizationReviews = (props: {
  reviews: Review[];
  org: Organization;
}) => {

  return (
    <div className="grid gap-4">
      {props.reviews.map((review) => (
        <ReviewComponent key={review.id} review={review} />
      ))}
      {props.org.attributes.google_place_details?.reviews.map((review) => (
        <GoogleReviewComponent key={review.author_name} review={review} />
      ))}
    </div>
  );
}
