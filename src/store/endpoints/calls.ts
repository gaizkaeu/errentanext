import { api } from "../api";
import { BaseQueryResponseList } from "../types";
import { Call, CallAttributes, CallManage } from "../types/Call";

const callsApi = api.injectEndpoints({
  endpoints: (build) => ({
    createCallMutation: build.mutation<
      Call,
      CallAttributes
    >({
      query: (body) => ({
        url: `calls`,
        method: "post",
        body: body
      }),
    }),
    getCallsManage: build.query<
      CallManage[],
      { org_id: string; }
    >({
      query: (id) => ({
        url: `organization-manage/${id.org_id}/calls`,
        method: "get",
      }),
      providesTags: (result) => [{ type: "CallManage", id: "LIST" }],
      transformResponse: (response: BaseQueryResponseList<CallManage>) =>
        response.data,
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreateCallMutationMutation,
  useGetCallsManageQuery,
} = callsApi;
