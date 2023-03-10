import { Review } from "@/store/types/Organization";
import { ReviewComponent } from "../reviews";

export const OrganizationReviews = (props: {
  reviews: Review[];
}) => {

  return (
    <div className="grid gap-4">
      {props.reviews.map((review) => (
        <ReviewComponent key={review.id} review={review} />
      ))}
    </div>
  );
}
