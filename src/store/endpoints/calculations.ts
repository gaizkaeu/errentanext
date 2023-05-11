import { api } from "../api";
import { BaseQueryResponse } from "../types";
import { BulkCalculation, Calculation, CalculationAttributes, CalculationManage, CalculationManageAttributes, Calculator, CalculatorManage, CalculatorManageAttributes } from "../types/Calculator";


const calculationsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getCalculator: build.query<Calculator, { org_id: string, calcr_id: string }>({
      query: (data) => ({ url: `organizations/${data.org_id}/calculators/${data.calcr_id}`, method: "get" }),
      transformResponse: (response: BaseQueryResponse<Calculator>) =>
        response.data,
    }),
    createCalculation: build.mutation<Calculation, Partial<CalculationAttributes> & { calculator_id: string }>({
      query: (data) => ({ url: `calculations`, method: "post", body: data }),
      transformResponse: (response: BaseQueryResponse<Calculation>) =>
        response.data,
    }),
    getCalculation: build.query<Calculation, string>({
      query: (data) => ({ url: `calculations/${data}`, method: "get" }),
      providesTags: (result) => [{ type: "Calculation", id: result?.id }],
      transformResponse: (response: BaseQueryResponse<Calculation>) =>
        response.data,
    }),
    getCalculationManage: build.query<CalculationManage, {org_id: string, calcn_id: string}>({
      query: (data) => ({ url: `organization-manage/${data.org_id}/${data.calcn_id}`, method: "get" }),
      providesTags: (result) => [{ type: "Calculation", id: result?.id }],
      transformResponse: (response: BaseQueryResponse<CalculationManage>) =>
        response.data,
    }),
    getCalculatorManage: build.query<
      CalculatorManage,
      { calcr_id: string; org_id: string }
    >({
      query: (id) => ({
        url: `organization-manage/${id.org_id}/calculators/${id.calcr_id}`,
        method: "get",
      }),
      providesTags: (result) => [{ type: "CalculatorManage", id: result?.id }],
      transformResponse: (response: BaseQueryResponse<CalculatorManage>) =>
        response.data,
    }),
    updateCalculatorManage: build.mutation<
      CalculatorManage,
      { calculator_id: string; org_id: string & Partial<CalculatorManageAttributes> }
    >({
      query: (id) => ({
        url: `organization-manage/${id.org_id}/calculators/${id.calculator_id}`,
        method: "put",
        body: id
      }),
      invalidatesTags: (result) => ["CalculatorManage"],
      transformResponse: (response: BaseQueryResponse<CalculatorManage>) =>
        response.data,
    }),
    deleteCalculatorManage: build.mutation<
      void,
      { calculator_id: string; org_id: string, calculation_id: string }
    >({
      query: (id) => ({
        url: `organization-manage/${id.org_id}/calculators/${id.calculator_id}/calculations/${id.calculation_id}`,
        method: "delete",
        body: id
      }),
      invalidatesTags: (result) => ["Calculation"],
    }),
    trainCalculatorManage: build.mutation<
      CalculatorManage,
      { calculator_id: string; org_id: string }
    >({
      query: (id) => ({
        url: `organization-manage/${id.org_id}/calculators/${id.calculator_id}/train`,
        method: "post",
        body: id
      }),
      invalidatesTags: (result) => ["CalculatorManage"],
      transformResponse: (response: BaseQueryResponse<CalculatorManage>) =>
        response.data,
    }),
    updateCalculationManage: build.mutation<
      CalculationManage,
      { calcr_id: string; org_id: string, calcn_id: string & Partial<CalculationManageAttributes> }
    >({
      query: (id) => ({
        url: `organization-manage/${id.org_id}/calculators/${id.calcr_id}/calculations/${id.calcn_id}`,
        method: "put",
        body: id,
      }),
      invalidatesTags: (result) => ["Calculation"],
      transformResponse: (response: BaseQueryResponse<CalculationManage>) =>
        response.data,
    }),
    createCalculationManage: build.mutation<
      CalculationManage,
      { calculator_id: string; org_id: string & Partial<CalculationManageAttributes> }
    >({
      query: (id) => ({
        url: `organization-manage/${id.org_id}/calculators/${id.calculator_id}/calculations/`,
        method: "post",
        body: id,
      }),
      invalidatesTags: (result) => ["Calculation"],
      transformResponse: (response: BaseQueryResponse<CalculationManage>) =>
        response.data,
    }),
    createCalculationManagePreview: build.query<
      { [key: string]: number },
      { calculator_id: string; org_id: string & Partial<CalculationManageAttributes> }
    >({
      query: (id) => ({
        url: `organization-manage/${id.org_id}/calculators/${id.calculator_id}/calculations/preview`,
        method: "post",
        body: id,
      }),
    }),
    getBulkCalculation: build.query<
      BulkCalculation,
      string
    >({
      query: (id) => ({
        url: `bulk-calculations/${id}`,
        method: "get",
      }),
      transformResponse: (response: BaseQueryResponse<BulkCalculation>) =>
        response.data,
    }),
    createBulkFromCalculation: build.mutation<
      BulkCalculation,
      string
    >({
      query: (id) => ({
        url: `calculations/${id}/bulk`,
        method: "post",
      }),
      invalidatesTags: (result) => ["Calculation"],
      transformResponse: (response: BaseQueryResponse<BulkCalculation>) =>
        response.data,
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetCalculatorQuery,
  useCreateCalculationMutation,
  useGetCalculatorManageQuery,
  useGetCalculationQuery,
  useUpdateCalculationManageMutation,
  useCreateCalculationManageMutation,
  useCreateCalculationManagePreviewQuery,
  useLazyCreateCalculationManagePreviewQuery,
  useUpdateCalculatorManageMutation,
  useTrainCalculatorManageMutation,
  useGetBulkCalculationQuery,
  useCreateBulkFromCalculationMutation,
  useGetCalculationManageQuery,
  useDeleteCalculatorManageMutation,
} = calculationsApi;
