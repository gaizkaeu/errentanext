"use client";
import { OrganizationSubscriptionOverview, PricingTable } from "@/components/organizations";
import { useGetOrganizationManageByIdQuery, useGetSubscriptionOverviewQuery } from "@/store/endpoints/organizations";


export default function Page({ params }: { params: { id: string } }) {

  const { currentData } = useGetOrganizationManageByIdQuery(params.id);
  const { currentData: subscriptonData } = useGetSubscriptionOverviewQuery(params.id);

  return (
    <div className="w-full">
      {subscriptonData ? (
        <>
          <OrganizationSubscriptionOverview subscription={subscriptonData} />
        </>
      ) : (
        <PricingTable org_id={params.id} />
      )}
    </div>
  );
}