"use client";
import { useLazyGetStripeCustomerPortalQuery } from "@/store/endpoints/userAccounts";
import { Button } from "../ui/button";

export const StripeCustomerPortal = () => {
  const [getUrl, { isLoading }] = useLazyGetStripeCustomerPortalQuery();

  const onClick = () => {
    getUrl()
      .unwrap()
      .then((url) => {
        window.open(url.url, "_blank");
      });
  };

  return <Button onClick={onClick}>
    {isLoading ? "Cargando..." : "Administrar pagos"}
  </Button>;
};