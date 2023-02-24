import { createSlice } from "@reduxjs/toolkit";
import { AuthState } from "../types/User";
import { userAccountsApi } from "../endpoints/userAccounts";
import { authenticationApi } from "../endpoints/authentication";
import { isErrorWithMessage, isFetchBaseQueryError } from "../helpers";

const initialState: AuthState = {
  status: true,
  status_mfa: "no-mfa",
  error: undefined,
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
            payload.success &&
            payload.success === "You have been logged in"
          ) {
            state.status = true;
          }
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
            const errMsg = 'error' in payload ? payload.error : JSON.stringify(payload.data)
            switch (errMsg) {
              case "Please login to continue":
                state.status = false;
                break;
              case "You need to authenticate via an additional factor before continuing":
                state.status_mfa = "mfa-required";
                state.status = true;
                break;
              default:
                state.status = false;
                break;
            }
          } else {
            state.status = false;
          }
        }
      )
      .addMatcher(
        userAccountsApi.endpoints.getCurrentUser.matchFulfilled,
        (state, { payload }) => {
          state.user = payload;
          state.status = true;
        }
      );
  },
  reducers: {},
});

export default authSlice.reducer;
