import { Review } from "@/store/types/Organization";
import { ReviewComponent } from "../reviews";

export const OrganizationReviews = (props: {
  reviews: Review[];
}) => {

  return (
    <>
      <h3 className="text-2xl font-semibold">Reseñas</h3>
      <div className="grid gap-4 m-3">
        {props.reviews.map((review) => (
          <ReviewComponent key={review.id} review={review} />
        ))}
      </div>
    </>
  );
}
