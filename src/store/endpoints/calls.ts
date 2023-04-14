import { api } from "../api";
import { Call, CallAttributes } from "../types/Call";

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

  }),
  overrideExisting: false,
});

export const {
  useCreateCallMutationMutation
} = callsApi;
