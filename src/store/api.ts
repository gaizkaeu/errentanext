import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";
import queryString from "query-string";
import { Organization } from "./types/Organization";
import { BaseQueryResponseList } from "./types";

export const api = createApi({
  reducerPath: "api",
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath]
    }
  },
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.errenta.eus:3000/api/v1/",
    credentials: "include",
    paramsSerializer(params) {
      return queryString.stringify(params, { arrayFormat: "bracket" });
    },
  }),
  tagTypes: [
    "Organization",
    "AUTHENTICATED_USER",
    "User",
    "WEB_AUTHN_KEYS"
  ],
  endpoints: (build) => ({
    getOrganizations: build.query<Organization[], Record<string, string | string[]>>({
      query: (params) => ({
        url: `organizations`,
        params: params,
        method: "get",
      }),
      transformResponse: (response: BaseQueryResponseList<Organization>) => {
        return response.data;
      }
    }),
  }),
});

export const {
  useGetOrganizationsQuery
} = api;
