import { createSlice } from "@reduxjs/toolkit";
import { AuthState } from "../types/User";
import { userAccountsApi } from "../endpoints/userAccounts";
import { authenticationApi } from "../endpoints/authentication";
import { isFetchBaseQueryError } from "../helpers";

const initialState: AuthState = {
  status: true,
  status_mfa: "no-mfa",
  error: undefined,
  token: undefined,
  error_code: undefined,
  user: undefined,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  extraReducers(builder) {
    builder
      .addMatcher(
        userAccountsApi.endpoints.createNewAccount.matchFulfilled,
        (state) => {
          state.status = true;
      })
      .addMatcher(
        userAccountsApi.endpoints.loginAccount.matchFulfilled,
        (state, { payload }) => {
          if (
            payload.success === "You have been logged in" &&
             payload.token !== null
          ) {
            state.status = true;
            state.token = payload.token;
          }
          console.log("token", payload.token);
        }
      )
      .addMatcher(authenticationApi.endpoints.getMFAuthMethods.matchFulfilled, (state) => {
        state.status_mfa = "mfa-required";
      })
      .addMatcher(authenticationApi.endpoints.getMFAuthMethods.matchRejected, (state) => {
        state.status_mfa = "no-mfa";
      })
      .addMatcher(authenticationApi.endpoints.mfaOTPAuth.matchRejected, (state) => {
        state.status_mfa = "mfa-required";
      })
      .addMatcher(authenticationApi.endpoints.mfaOTPAuth.matchFulfilled, (state) => {
        state.status_mfa = "mfa-success";
      })
      .addMatcher(
        userAccountsApi.endpoints.getCurrentUser.matchRejected,
        (state, { payload }) => {
          if (isFetchBaseQueryError(payload)) {
            const err = payload.data as any;
            switch (err.error) {
              case "Please login to continue":
                state.status = false;
                break;
              case "You need to authenticate via an additional factor before continuing":
                state.status_mfa = "mfa-required";
                state.status = true;
                break;
              default:
                state.status = false;
                state.status_mfa = "no-mfa";
                break;
            }
          } else {
            state.status = false;
            state.status_mfa = "no-mfa";
          }
        }
      )
      .addMatcher(
        userAccountsApi.endpoints.getCurrentUser.matchFulfilled,
        (state, { payload }) => {
          state.user = payload;
          state.status = true;
          if (payload.token) {
            state.token = payload.token;
          }
        }
      );
  },
  reducers: {},
});

export default authSlice.reducer;
