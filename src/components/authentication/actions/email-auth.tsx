"use client";
import { useEmailAuthMutation } from "@/store/endpoints/authentication";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const EmailAuth = (props: {id: string}) => {
  const [emailAuth] = useEmailAuthMutation();
  const r = useRouter();

  useEffect(() => {
    emailAuth({ key: props.id })
      .unwrap()
      .then(() => {
        r.replace('/dashboard');
      });
  }, []);

  return <p>loading...</p>;
}