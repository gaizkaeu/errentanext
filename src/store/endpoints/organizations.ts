import { api } from "../api";
import { BaseQueryResponse, BaseQueryResponseList } from "../types";
import { LawyerProfile } from "../types/LawyerProfile";
import { Organization, OrganizationAttributes, OrganizationInvitation, OrganizationInvitationAttributes, OrganizationMembership, OrganizationMembershipAttributes, OrganizationStats, Review, StripeSubscription, processOrganization } from "../types/Organization";
import { Tag } from "../types/Tag";
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
    getOrganizationsManage: build.query<OrganizationMembership[], Record<string, string>>(
      {
        query: (data) => ({
          url: "organization-memberships",
          method: "get",
          params: data,
        }),
        transformResponse: (response: BaseQueryResponseList<OrganizationMembership>) => (
          response.data
        ),
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
    createOrganizationJoinRequest: build.mutation<
      Partial<Organization>,
      Partial<OrganizationAttributes>
    >({
      query: (data) => ({
        url: `organization_requests/`,
        method: "POST",
        body: data,
      }),
      transformResponse: (response: BaseQueryResponse<Partial<Organization>>) => (
        response.data
      ),
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
  getSkillsTags: build.query<
    Tag[],
    Record<string, string>
  >({
    query: (data) => ({
      url: 'skills_tags',
      params: data,
      method: "get",
    }),
    transformResponse: (response: BaseQueryResponseList<Tag>) =>
      response.data,
  }),
  getServiceTags: build.query<
    Tag[],
    Record<string, string>
  >({
    query: (data) => ({
      url: 'services_tags',
      params: data,
      method: "get",
    }),
    transformResponse: (response: BaseQueryResponseList<Tag>) =>
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
    getOrganizationMemberships: build.query<
      OrganizationMembership[],
      { id: string; filters: Record<string, string> }
    >({
      query: (id) => ({
        url: `organization-manage/${id.id}/memberships`,
        method: "get",
      }),
      transformResponse: (response: BaseQueryResponseList<OrganizationMembership>) =>
        response.data,
      providesTags: () => [{ type: "OrganizationMembership", id: "LIST" }],
    }),
    updateOrganizationMembership: build.mutation<
      OrganizationMembership,
      Partial<OrganizationMembershipAttributes> & Pick<OrganizationMembership, "id">
    >({
      query: (data) => ({
        url: `organization-manage/${data.organization_id}/memberships/${data.id}`,
        method: "put",
        body: data,
      }),
      invalidatesTags: () => [{ type: "OrganizationMembership", id: "LIST" }],
    }),
    deleteOrganizationMembership: build.mutation<
      void,
      string
    >({
      query: (data) => ({
        url: `organization-manage/memberships/${data}`,
        method: "delete",
      }),
      invalidatesTags: () => [{ type: "OrganizationMembership", id: "LIST" }],
    }),
    updateOrganizationInvitation: build.mutation<
      OrganizationInvitation,
      Partial<OrganizationInvitationAttributes> & Pick<OrganizationInvitation, "id">
    >({
      query: (data) => ({
        url: `organization-manage/invitations/${data.id}`,
        method: "put",
        body: data,
      }),
      invalidatesTags: () => [{ type: "OrganizationInvitation", id: "LIST" }],
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
    createOrganizationInvitation: build.mutation<
      OrganizationInvitation,
      Partial<OrganizationInvitationAttributes>
      >({
      query: (data) => ({
        url: `organization-manage/${data.organization_id}/invitations`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: () => [{ type: "OrganizationInvitation", id: "LIST" }],
    }),
    getOrganizationInvitations: build.query<
      OrganizationInvitation[],
      { id: string; filters: Record<string, string> }
    >({
      query: (id) => ({
        url: `organization-manage/${id.id}/invitations`,
        method: "get",
        params: id.filters,
      }),
      transformResponse: (response: BaseQueryResponseList<OrganizationInvitation>) =>
        response.data,
      providesTags: () => [{ type: "OrganizationInvitation", id: "LIST" }]
    }),
    getOrganizationInvitation: build.query<
      OrganizationInvitation,
      string
    >({
      query: (id) => ({
        url: `organization-manage/invitations/${id}`,
        method: "get",
      }),
      transformResponse: (response: BaseQueryResponse<OrganizationInvitation>) =>
        response.data,
    }),
    acceptOrganizationInvitation: build.mutation<
      OrganizationInvitation,
      string
    >({
      query: (id) => ({
        url: `organization-manage/invitations/${id}/accept`,
        method: "post",
      }),
      invalidatesTags: () => [{ type: "OrganizationInvitation", id: "LIST" }, 
      { type: "Organization", id: "LIST" }],
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
  useGetOrganizationTransactionsQuery,
  useGetSkillsTagsQuery,
  useCreateOrganizationJoinRequestMutation,
  useGetOrganizationMembershipsQuery,
  useCreateOrganizationInvitationMutation,
  useGetOrganizationInvitationsQuery,
  useUpdateOrganizationMembershipMutation,
  useUpdateOrganizationInvitationMutation,
  useDeleteOrganizationMembershipMutation,
  useGetOrganizationInvitationQuery,
  useGetServiceTagsQuery,
  useLazyGetOrganizationInvitationQuery,
  useAcceptOrganizationInvitationMutation
} = organizationsApi;
