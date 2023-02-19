import { api } from "../api";
import {
  TaxIncome,
  TaxIncomeAttributes,
  TaxIncomeData,
} from "../types/TaxIncome";
import {
  BaseQueryResponse,
  BaseQueryResponseList,
} from "../types";

const taxIncomeApi = api.injectEndpoints({
  endpoints: (build) => ({
    getTaxIncomes: build.query<TaxIncome[], Record<string, string>>({
      query: (data) => ({ url: "tax_incomes", method: "get", params: data }),
      transformResponse: (response: BaseQueryResponseList<TaxIncome>) =>
        response.data,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({
                type: "TaxIncome" as const,
                id,
              })),
              { type: "TaxIncome", id: "LIST" },
            ]
          : [{ type: "TaxIncome", id: "LIST" }],
    }),
    getTaxIncomesFromOrganization: build.query<
      TaxIncome[],
      {
        organization_id: string;
        filters: Record<string, string | string[]>;
      }
    >({
      query: (data) => ({
        url: `organization-manage/${data.organization_id}/tax_incomes`,
        method: "get",
        params: data.filters,
      }),
      transformResponse: (response: BaseQueryResponseList<TaxIncome>) =>
        response.data,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({
                type: "TaxIncome" as const,
                id,
              })),
              { type: "TaxIncome", id: "LIST" },
            ]
          : [{ type: "TaxIncome", id: "LIST" }],
    }),
    createTaxIncomePaymentIntent: build.mutation<
      { clientSecret: string; amount: number },
      string
    >({
      query: (id) => ({
        url: `tax_incomes/${id}/create_payment_intent`,
        method: "post",
      }),
    }),
    getTaxIncomeById: build.query<TaxIncome, string>({
      query: (id) => ({ url: `tax_incomes/${id}`, method: "get" }),
      transformResponse: (response: BaseQueryResponse<TaxIncome>) =>
        response.data,
      providesTags: (_result, _error, id) => [{ type: "TaxIncome", id }],
    }),
    createTaxIncome: build.mutation<TaxIncome, Partial<TaxIncomeData>>({
      transformResponse: (response: BaseQueryResponse<TaxIncome>) =>
        response.data,
      query: (data) => ({ url: `tax_incomes`, method: "post", body: data }),
      invalidatesTags: [{ type: "TaxIncome", id: "LIST" }],
    }),
    updateTaxIncome: build.mutation<
      TaxIncome,
      Partial<TaxIncomeAttributes> & Pick<TaxIncome, "id">
    >({
      query: ({ id, ...patch }) => ({
        url: `tax_incomes/${id}`,
        method: "put",
        body: { tax_income: patch },
      }),
      invalidatesTags: (result, _error) => [
        { type: "TaxIncome", id: result?.id },
      ],
    }),
    deleteTaxIncome: build.mutation<void, string>({
      query: (data) => ({
        url: `tax_incomes/${data}`,
        method: "delete",
      }),
      invalidatesTags: (result, _error, id) => [{ type: "TaxIncome", id: id }],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetTaxIncomesQuery,
  useCreateTaxIncomePaymentIntentMutation,
  useGetTaxIncomeByIdQuery,
  useCreateTaxIncomeMutation,
  useUpdateTaxIncomeMutation,
  useDeleteTaxIncomeMutation,
  useGetTaxIncomesFromOrganizationQuery,
} = taxIncomeApi;
