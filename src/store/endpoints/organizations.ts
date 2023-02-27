import { api } from "../api";
import { BaseQueryResponse, BaseQueryResponseList } from "../types";
import { LawyerProfile } from "../types/LawyerProfile";
import { Organization, OrganizationAttributes, OrganizationStats, Review, StripeSubscription, processOrganization } from "../types/Organization";
import { Transaction } from "../types/Transaction";


const transformResponse = (response: BaseQueryResponse<Organization>) => {
  return processOrganization(response.data);
};

const transformResponseList = (
  response: BaseQueryResponseList<Organization>
) => {
  const { data } = response;
  data.map((item) => {
    return processOrganization(item);
  });
  return data;
};

const transformResponseReviewList = (
  response: BaseQueryResponseList<Review>
) => {
  const { data } = response;
  return data;
};

const organizationsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getOrganizations: build.query<Organization[], Record<string, string>>({
      query: (data) => ({ url: "organizations", method: "get", params: data }),
      transformResponse: transformResponseList,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({
                type: "Organization" as const,
                id,
              })),
              { type: "Organization", id: "LIST" },
            ]
          : [{ type: "Organization", id: "LIST" }],
    }),
    getOrganizationsManage: build.query<Organization[], Record<string, string>>(
      {
        query: (data) => ({
          url: "organization-manage",
          method: "get",
          params: data,
        }),
        transformResponse: transformResponseList,
        providesTags: (result) =>
          result
            ? [
                ...result.map(({ id }) => ({
                  type: "Organization" as const,
                  id,
                })),
                { type: "Organization", id: "LIST" },
              ]
            : [{ type: "Organization", id: "LIST" }],
      }
    ),
    getOrganizationById: build.query<Organization, string>({
      query: (id) => ({ url: `organizations/${id}`, method: "get" }),
      providesTags: (_result, _error, id) => [{ type: "Organization", id }],
      transformResponse: transformResponse,
    }),
    getOrganizationManageById: build.query<Organization, string>({
      query: (id) => ({ url: `organization-manage/${id}`, method: "get" }),
      providesTags: (_result, _error, id) => [{ type: "Organization", id }],
      transformResponse: transformResponse,
    }),
    getReviews: build.query<
      Review[],
      { organization_id: string; filters: Record<string, string | string[]> }
    >({
      query: (id) => ({
        url: `organizations/${id.organization_id}/reviews`,
        method: "get",
        params: id.filters,
      }),
      transformResponse: transformResponseReviewList,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({
                type: "Review" as const,
                id,
              })),
              { type: "Review", id: "LIST" },
            ]
          : [{ type: "Review", id: "LIST" }],
    }),
    updateOrganizationById: build.mutation<
      Organization,
      Partial<Organization> & Pick<Organization, "id">
    >({
      query: (data) => ({
        url: `organization-manage/${data.id}`,
        method: "put",
        body: data,
      }),
      invalidatesTags: (result) => [{ type: "Organization", id: result?.id }],
    }),
    createOrganization: build.mutation<
      Organization,
      Partial<OrganizationAttributes>
    >({
      query: (data) => ({
        url: `organization-manage/`,
        method: "POST",
        body: data,
      }),
      transformResponse: transformResponse,
      invalidatesTags: (result) => [{ type: "Organization", id: result?.id }],
    }),
    createReview: build.mutation<
      Review,
      Partial<Review> & { organization_id: string }
    >({
      query: (id) => ({
        url: `reviews`,
        method: "post",
        body: id,
      }),
      transformResponse: (response: BaseQueryResponse<Review>) => response.data,
      invalidatesTags: (result) => [
        { type: "Review", id: "LIST" },
        {
          type: "Organization",
          id: result?.relationships.organization.data?.id,
        },
        {
          type: "Organization",
          id: "LIST",
        },
      ],
    }),
    getOrganizationStats: build.query<
      OrganizationStats[],
      { id: string; filters: Record<string, string> }
    >({
      query: (id) => ({
        url: `organization-manage/${id.id}/stats`,
        method: "get",
        params: id.filters,
      }),
      transformResponse: (response: BaseQueryResponseList<OrganizationStats>) =>
        response.data,
    }),
    getOrganizationLawyers: build.query<
      LawyerProfile[],
      { id: string; filters: Record<string, string> }
    >({
      query: (id) => ({
        url: `organization-manage/${id.id}/lawyer_profiles`,
        method: "get",
        params: id.filters,
      }),
      transformResponse: (response: BaseQueryResponseList<LawyerProfile>) =>
        response.data,
    }),
    getOrganizationTransactions: build.query<
      Transaction[],
      { id: string; filters: Record<string, string> }
    >({
      query: (id) => ({
        url: `organization-manage/${id.id}/transactions`,
        method: "get",
        params: id.filters,
      }),
      transformResponse: (response: BaseQueryResponseList<Transaction>) =>
        response.data,
    }),
    getSubscriptionPaymentUrl: build.query<
      { url: string },
      { id: string; return_url: string; price_id: string }
    >({
      query: (id) => ({
        url: `organization-manage/${id.id}/subscription`,
        method: "post",
        body: {
          return_url: id.return_url,
          price_id: id.price_id,
        },
      }),
    }),
    getSubscriptionOverview: build.query<StripeSubscription, string>({
      query: (id) => ({
        url: `organization-manage/${id}/subscription/retrieve`,
        method: "get",
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetOrganizationManageByIdQuery,
  useGetOrganizationByIdQuery,
  useLazyGetOrganizationsQuery,
  useGetOrganizationsQuery,
  useGetReviewsQuery,
  useUpdateOrganizationByIdMutation,
  useGetOrganizationStatsQuery,
  useCreateReviewMutation,
  useGetOrganizationsManageQuery,
  useLazyGetSubscriptionPaymentUrlQuery,
  useGetSubscriptionOverviewQuery,
  useCreateOrganizationMutation,
  useGetOrganizationLawyersQuery,
  useGetOrganizationTransactionsQuery
} = organizationsApi;
