import { api } from "../api";
import { BaseQueryResponse, BaseQueryResponseList } from "../types";
import { LawyerProfile, LawyerProfileAttributes } from "../types/LawyerProfile";

const lawyerProfilesApi = api.injectEndpoints({
  endpoints: (build) => ({
    getMyLawyerProfile: build.query<
      LawyerProfile,
      void
    >({
      query: () => ({
        url: "my-lawyer-profile",
        method: "get",
      }),
      transformResponse: (response: BaseQueryResponse<LawyerProfile>) =>
        response.data,
      providesTags: () => [{ type: "LawyerProfile", id: "me" }],
    }),
    getLawyerById: build.query<LawyerProfile, string>({
      query: (id) => ({ url: `lawyer_profiles/${id}`, method: "get" }),
      transformResponse: (response: BaseQueryResponse<LawyerProfile>) =>
        response.data,
      providesTags: (_result, _error, id) => [{ type: "LawyerProfile", id }],
    }),
    createMyLawyerProfile: build.mutation<
      LawyerProfile,
      Partial<LawyerProfileAttributes>
    >({
      query: (body) => ({ url: `my-lawyer-profile`, method: "post", body: {lawyer_profile: body} }),
      invalidatesTags: [{ type: "LawyerProfile", id: "me" }],
      transformResponse: (response: BaseQueryResponse<LawyerProfile>) =>
        response.data,
    }),
    updateMyLawyerProfile: build.mutation<
      LawyerProfile,
      Partial<LawyerProfileAttributes>
    >({
      query: (data) => ({
        url: `my-lawyer-profile`,
        method: "put",
        body: {lawyer_profile: data},
      }),
      invalidatesTags: () => [{ type: "LawyerProfile", id: "me" }],
      transformResponse: (response: BaseQueryResponse<LawyerProfile>) =>
        response.data,
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetMyLawyerProfileQuery,
  useCreateMyLawyerProfileMutation,
  useGetLawyerByIdQuery,
  useUpdateMyLawyerProfileMutation,
} = lawyerProfilesApi;
