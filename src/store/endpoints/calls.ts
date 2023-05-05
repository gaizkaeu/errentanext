import { api } from "../api";
import { BaseQueryResponse, BaseQueryResponseList } from "../types";
import { CalculatorManageAttributes } from "../types/Calculator";
import { Call, CallAttributes, CallManage, CallManageAttributes } from "../types/Call";

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
      { org_id: string; filters: Record<string, string | number> }
    >({
      query: (id) => ({
        url: `organization-manage/${id.org_id}/calls`,
        params: id.filters,
        method: "get",
      }),
      providesTags: (result) => [{ type: "CallManage", id: "LIST" }],
      transformResponse: (response: BaseQueryResponseList<CallManage>) =>
        response.data,
    }),
    getCallManage: build.query<
      CallManage,
      { org_id: string; call_id: string }
    >({
      query: (id) => ({
        url: `organization-manage/${id.org_id}/calls/${id.call_id}`,
        method: "get",
      }),
      providesTags: (result) => [{ type: "CallManage", id: result?.id }],
      transformResponse: (response: BaseQueryResponse<CallManage>) =>
        response.data,
    }),
    updateCallManage: build.mutation<
      CallManage,
      { org_id: string; call_id: string & Partial<CallManageAttributes>}
    >({
      query: (id) => ({
        url: `organization-manage/${id.org_id}/calls/${id.call_id}`,
        method: "put",
        body: id
      }),
      invalidatesTags: (result) => [{ type: "CallManage", id: "LIST" }],
      transformResponse: (response: BaseQueryResponse<CallManage>) =>
        response.data,
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreateCallMutationMutation,
  useGetCallsManageQuery,
  useUpdateCallManageMutation,
  useGetCallManageQuery,
  
} = callsApi;
