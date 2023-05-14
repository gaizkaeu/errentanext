"use client";
import { useAuth } from "@/components/providers/authProvider";
import { useGetMFAuthMethodsQuery } from "@/store/endpoints/authentication";
import { useGetCurrentUserQuery } from "@/store/endpoints/userAccounts";
import { AccountType } from "@/store/types/User";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SingInDialog } from "../actions";

export interface PrivateRouteProps {
  roles: AccountType[] | "*";
}

interface PrivateRouteElementProps extends PrivateRouteProps {
  children?: JSX.Element;
  action: "redirect" | "auth" | "blank";
  redirect_path_on_fail?: string;
  auth_path?: string;
}

export const PrivateButton = (
  props: {
    children: JSX.Element;
  }
): JSX.Element => {
  const { isAuthenticated } = useAuth();
  const r = useRouter();

  if (isAuthenticated) {
    return (
      <SingInDialog>
        {props.children}
      </SingInDialog>
    );
  } else {
    return (props.children);
  }
};

const PrivateRoute = (
  props: PrivateRouteElementProps = {
    roles: ["admin"],
    children: <></>,
    action: "blank",
  }
): JSX.Element => {
  const { isAuthenticated, isMFAuthenticated } = useAuth();
  const { isLoading: mfaLoading } = useGetMFAuthMethodsQuery();
  const { currentData } = useGetCurrentUserQuery();
  const r = useRouter();
  const p = usePathname();


  const not_autorized_action = () => {
    switch (props.action) {
      case "auth":
        r.push('/account/sign_in?from=' + encodeURIComponent(p ?? ''));
        break;
      case "redirect":
        r.push(props.redirect_path_on_fail ?? '/account/sign_in?from=' + encodeURIComponent(p ?? ''))
    
      default:
        return <></>;
    }
  };

  const mfa_required_action = () => {
    if (p && p.includes('/account/mfa')) return;
    r.push('/account/mfa?from=' + encodeURIComponent(p ?? ''))
  };

  if (isAuthenticated) {
    if (!mfaLoading && isMFAuthenticated === "mfa-required") {
      mfa_required_action();
      return <></>
    }
    if (currentData) {
      if (
        props.roles.includes(currentData.attributes.account_type) ||
        props.roles === "*"
      ) {
        return props.children ?? <></>;
      } else {
        not_autorized_action();
        return <></>
      }
    } else {
      return <></>;
    }
  } else {
    not_autorized_action();
    return <></>
  }
};

export { PrivateRoute };
