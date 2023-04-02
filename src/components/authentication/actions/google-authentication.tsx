"use client";
import { Button } from "@/components/ui/button";
import { useGetGoogleAuthUrlMutation, useGoogleCallbackMutation } from "@/store/endpoints/authentication";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export const GoogleSignInButton = (props: {redirectUrl?: string}) => {
  const [googleUrl] = useGetGoogleAuthUrlMutation();

  const handleGoogleUrl = async () => {
    const response = await googleUrl().unwrap();
    const url = new URL(response.authorize_url);
    if (props.redirectUrl) {
      const state = url.searchParams.get('state');
      console.log(state);
      localStorage.setItem(state ?? '', props.redirectUrl);
    }
    if (response.authorize_url) {
      window.location.href = response.authorize_url;
    }
  }

  return (
    <Button size="sm" onClick={() => handleGoogleUrl()}>
      <svg className="w-4 h-4 mr-2" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg>
      Sign in with Google
    </Button>
  )
}

export const GoogleCallback = () => {

  const [callbackMutation] = useGoogleCallbackMutation();
  const r = useRouter();
  const s = useSearchParams();

  useEffect(() => {
    callbackMutation(window.location.search).unwrap().then(() => {
      const state = s.get('state');
      if (state && localStorage.getItem(state)) {
        r.replace(localStorage.getItem(state) ?? '/dashboard');
        localStorage.removeItem(state);
      } else {
        r.replace('/dashboard');
      }
    });
  }, [])

  return (
    <div>
      <h1>Google Callback</h1>
    </div>
  )
}