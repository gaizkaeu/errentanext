import { api } from "../api";
import { BaseQueryResponse } from "../types";
import { Calculation, CalculationAttributes, CalculationManage, CalculationManageAttributes, Calculator, CalculatorManage } from "../types/Calculator";


const calculationsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getCalculator: build.query<Calculator, {org_id: string, calcr_id: string}>({
      query: (data) => ({ url: `organizations/${data.org_id}/calculators/${data.calcr_id}`, method: "get" }),
      transformResponse: (response: BaseQueryResponse<Calculator>) =>
        response.data,
    }),
    createCalculation: build.mutation<Calculation, Partial<CalculationAttributes> & {calculator_id: string}>({
      query: (data) => ({ url: `calculations`, method: "post", body: data }),
      transformResponse: (response: BaseQueryResponse<Calculation>) =>
        response.data,
    }),
    getCalculation: build.query<Calculation, string>({
      query: (data) => ({ url: `calculations/${data}`, method: "get" }),
      transformResponse: (response: BaseQueryResponse<Calculation>) =>
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
    updateCalculationManage: build.mutation<
      CalculationManage,
      { calcr_id: string; org_id: string, calcn_id: string & Partial<CalculationManageAttributes> }
    >({
      query: (id) => ({
        url: `organization-manage/${id.org_id}/calculators/${id.calcr_id}/calculations/${id.calcn_id}`,
        method: "put",
        body: id,
      }),
      invalidatesTags: (result) => ["CalculationManage"],
      transformResponse: (response: BaseQueryResponse<CalculationManage>) =>
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
} = calculationsApi;
