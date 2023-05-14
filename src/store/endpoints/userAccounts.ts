import { headers } from "next/dist/client/components/headers";
import { api } from "../api";
import { BaseQueryResponse, BaseQueryResponseList } from "../types";
import {
  SessionCreationData,
  IUser,
  UserRegistrationData,
  AccountHistoryLog,
} from "../types/User";

export const userAccountsApi = api.injectEndpoints({
  endpoints: (build) => ({
    loginAccount: build.mutation<{ success: string, token: string | null | undefined }, SessionCreationData>({
      query: (data) => ({
        url: "auth/login",
        method: "post",
        body: data,
      }),
      transformResponse: (apiresponse: {success: string}, meta) => ({success: apiresponse.success, token: meta?.response?.headers.get("Authorization")}),
      invalidatesTags: () => ["AUTHENTICATED_USER"],
    }),
    logOutAccount: build.mutation<void, void>({
      query: () => ({
        url: `auth/logout`,
        method: "post",
        body: {},
      }),
      invalidatesTags: () => ["AUTHENTICATED_USER"],
    }),
    createNewAccount: build.mutation<IUser, UserRegistrationData>({
      query: (data) => ({
        url: "auth/create-account",
        method: "post",
        body: data,
      }),
      invalidatesTags: () => ["AUTHENTICATED_USER"],
    }),
    getCurrentUser: build.query<IUser & {token: string | null | undefined}, void>({
      query: () => ({ url: "accounts/me", method: "get" }),
      transformResponse: (response: BaseQueryResponse<IUser>, meta) => ({token: meta?.response?.headers.get("Authorization"), ...response.data}),
      providesTags: (_result, _error, _id) => ["AUTHENTICATED_USER"],
    }),
    getStripeCustomerPortal: build.query<{ url: string }, void>({
      query: () => ({ url: "accounts/stripe-customer-portal", method: "post" }),
    }),
    updateUser: build.mutation<IUser, Partial<IUser> & Pick<IUser, "id">>({
      query: ({ id, ...patch }) => ({
        url: `accounts/${id}`,
        method: "put",
        body: { user: patch },
      }),
      invalidatesTags: (result, _error, _id) => [
        "AUTHENTICATED_USER",
        { type: "User", id: result?.id },
        { type: "User", id: "LIST" },
      ],
    }),
    getUsers: build.query<IUser[], Record<string, string>>({
      query: (data) => ({ url: `accounts`, method: "get", params: data }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({
                type: "User" as const,
                id,
              })),
              { type: "User", id: "LIST" },
            ]
          : [{ type: "User", id: "LIST" }],
      transformResponse: (response: BaseQueryResponseList<IUser>) =>
        response.data,
    }),
    getUserById: build.query<IUser, string>({
      query: (data) => ({ url: `accounts/${data}`, method: "get" }),
      transformResponse: (response: BaseQueryResponse<IUser>) => response.data,
    }),
    getUserAccountLog: build.query<AccountHistoryLog[], string>({
      transformResponse: (response: BaseQueryResponseList<AccountHistoryLog>) =>
        response.data,
      query: (data) => ({ url: `accounts/${data}/history`, method: "get" }),
    }),
    searchUser: build.query<IUser[], Record<string, string | number | boolean>>(
      {
        transformResponse: (response: BaseQueryResponseList<IUser>) =>
          response.data,
        query: (data) => ({ url: `accounts`, method: "get", params: data }),
      }
    ),
  }),
  overrideExisting: false,
});

export const {
  useGetUsersQuery,
  useLoginAccountMutation,
  useLogOutAccountMutation,
  useCreateNewAccountMutation,
  useGetCurrentUserQuery,
  useUpdateUserMutation,
  useGetUserByIdQuery,
  useGetUserAccountLogQuery,
  useSearchUserQuery,
  useLazySearchUserQuery,
  useLazyGetStripeCustomerPortalQuery,
} = userAccountsApi;
