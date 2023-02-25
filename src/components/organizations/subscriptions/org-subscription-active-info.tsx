import { StripeCustomerPortal } from "@/components/billing";
import { StripeSubscription } from "@/store/types/Organization";

export const OrganizationSubscriptionOverview = (props: { subscription: StripeSubscription }) => {
  const { subscription } = props;

  return (
    <div className="w-full">
      <p className="text-2xl font-bold">Mi Suscripción</p>
        <div className="mb-4">
          <span className="font-medium">ID:</span>
          <span className="ml-2">{subscription.id}</span>
        </div>
        <div className="mb-4">
          <span className="font-medium">Billing Cycle:</span>
          <span className="ml-2">
            {new Date(subscription.current_period_start * 1000).toDateString()} to{" "}
            {new Date(subscription.current_period_end * 1000).toDateString()}
          </span>
        </div>
        <div className="mb-4">
          <span className="font-medium">Customer:</span>
          <span className="ml-2">{subscription.customer}</span>
        </div>
        <div className="mb-4">
          <span className="font-medium">Plan:</span>
          <span className="ml-2">
            {subscription.items.data[0].plan.currency}{" "}
            {subscription.items.data[0].plan.amount / 100}/
            {subscription.items.data[0].plan.interval}
          </span>
        </div>
        <div className="mb-4">
          <span className="font-medium">Collection Method:</span>
          <span className="ml-2">{subscription.collection_method}</span>
        </div>
        <StripeCustomerPortal />
    </div>

  )

}