import { AuthValue, RegisterValue } from "@/lib/utils/webauth";
import { api } from "../api";
import {
  MFAManage,
  MFAuthentication,
  WebAuthKey,
} from "../types/User";

export const authenticationApi = api.injectEndpoints({
  endpoints: (build) => ({
    getMFAManage: build.query<MFAManage, void>({
      query: () => ({
        url: `auth/multifactor-manage`,
        method: "post",
        body: {},
      }),
      providesTags: () => ["AUTHENTICATED_USER"],
    }),
    getMFAuthMethods: build.query<MFAuthentication, void>({
      query: () => ({
        url: `auth/multifactor-auth`,
        method: "post",
        body: {},
      }),
      providesTags: () => ["AUTHENTICATED_USER"],
    }),
    mfaOTPAuth: build.mutation<void, { otp: string }>({
      query: (data) => ({
        url: "auth/otp-auth",
        method: "post",
        params: data,
        body: {},
      }),
      invalidatesTags: () => ["AUTHENTICATED_USER"],
    }),
    emailAuth: build.mutation<void, { key: string }>({
      query: (data) => ({
        url: "auth/email-auth",
        method: "post",
        params: {},
        body: data,
      }),
      invalidatesTags: () => ["AUTHENTICATED_USER"],
    }),
    otpSetup: build.mutation<
      void,
      {
        otp_secret?: string;
        otp_raw_secret?: string;
        password?: string;
        otp?: string;
      }
    >({
      query: (data) => ({
        url: "auth/otp-setup",
        method: "post",
        body: data,
      }),
      invalidatesTags: () => ["AUTHENTICATED_USER"],
    }),
    webAuthnSetup: build.mutation<
      void,
      {
        password?: string;
        webauthn_setup_challenge_hmac?: string;
        webauthn_setup_challenge?: string;
        webauthn_setup?: RegisterValue;
      }
    >({
      query: (data) => ({
        url: "auth/webauthn-setup",
        method: "post",
        body: data,
      }),
      invalidatesTags: () => ["AUTHENTICATED_USER"],
    }),
    webAuthnAuth: build.mutation<
      void,
      {
        login?: string;
        webauthn_auth_challenge_hmac?: string;
        webauthn_auth_challenge?: string;
        webauthn_auth?: AuthValue;
      }
    >({
      query: (data) => ({
        url: "auth/webauthn-auth",
        method: "post",
        body: data,
      }),
      invalidatesTags: () => ["AUTHENTICATED_USER"],
    }),
    webAuthnLogin: build.mutation<
      void,
      {
        login?: string;
        webauthn_auth_challenge_hmac?: string;
        webauthn_auth_challenge?: string;
        webauthn_auth?: AuthValue;
      }
    >({
      query: (data) => ({
        url: "auth/webauthn-login",
        method: "post",
        body: data,
      }),
      invalidatesTags: () => ["AUTHENTICATED_USER"],
    }),
    requestEmailAuth: build.mutation<void, { login: string }>({
      query: (data) => ({
        url: "auth/email-auth-request",
        method: "post",
        params: data,
        body: {},
      }),
    }),
    disableOTPAuth: build.mutation<void, { password: string }>({
      query: (data) => ({
        url: "auth/otp-disable",
        method: "post",
        params: data,
        body: {},
      }),
      invalidatesTags: () => ["AUTHENTICATED_USER"],
    }),
    getWebAuthKeys: build.query<WebAuthKey[], string>({
      query: (data) => ({
        url: `accounts/${data}/webauthn_keys`,
        method: "get",
      }),
      providesTags: () => ["AUTHENTICATED_USER", "WEB_AUTHN_KEYS"],

    }),
    getGoogleAuthUrl: build.mutation<{ authorize_url: string }, void>({
      query: () => ({ url: "auth/auth/google", method: "post" }),
    }),
    googleCallback: build.mutation<void, string>({
      query: (data) => ({ url: `auth/auth/google/callback${data}`, method: "post" }),
      invalidatesTags: () => ["AUTHENTICATED_USER"],
    }),
  }),
});

export const {
  useWebAuthnAuthMutation,
  useRequestEmailAuthMutation,
  useGetMFAuthMethodsQuery,
  useEmailAuthMutation,
  useMfaOTPAuthMutation,
  useGetGoogleAuthUrlMutation,
  useGoogleCallbackMutation
} = authenticationApi;