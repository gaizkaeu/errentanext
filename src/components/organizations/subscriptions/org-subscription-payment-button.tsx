"use client";

import { Button } from "@/components/ui/button";
import { useLazyGetSubscriptionPaymentUrlQuery } from "@/store/endpoints/organizations";


export const PaymentButton = (props: { id: string, org_id: string }) => {
  const [getUrl, { isLoading }] = useLazyGetSubscriptionPaymentUrlQuery();

  const handleClick = () => {
    getUrl({
      id: props.org_id,
      price_id: props.id,
      return_url: window.location.pathname,
    })
      .unwrap()
      .then((data) => {
        window.location.replace(data.url);
      });
  };

  return (
    <Button onClick={handleClick} className="mx-auto">
      {isLoading ? "Cargando..." : "Pagar"}
    </Button>
  );
};