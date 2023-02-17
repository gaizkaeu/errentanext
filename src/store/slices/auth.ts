import { createSlice } from "@reduxjs/toolkit";
import { AuthState } from "../types/User";
import { userAccountsApi } from "../endpoints/userAccounts";
import { authenticationApi } from "../endpoints/authentication";

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
          state.user = undefined;
          state.status = false;
          // if (true) (
          //   state = false;
          // ) {
          //   state.status = true;
          //   state.status_mfa = "mfa-required";
          // } else {
          //   state.status = false;
          //   state.status_mfa = "no-mfa";
          // }
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
