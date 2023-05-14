export interface IUser {
  type: "user";
  id: string;
  attributes: UserAttributes;
}

export const AccountTypes = [
  "client",
  "lawyer",
  "org_manage",
  "admin",
] as const;

export type AuthStatuses = boolean;

export type MFAStatuses =
  | "no-mfa"
  | "mfa-required"
  | "mfa-loading"
  | "mfa-success";

export interface AuthState {
  status: AuthStatuses;
  token: string | undefined;
  status_mfa: MFAStatuses;
  error: string | undefined;
  error_code: number | undefined;
  user: IUser | undefined;
}

export type AccountType = (typeof AccountTypes)[number];

export interface UserAttributes {
  email: string;
  has_password: boolean;
  first_name: string;
  last_name: string;
  confirmed: boolean;
  account_type: AccountType;
}

export interface AccountHistoryLog {
  type: "account_history";
  id: string;
  attributes: {
    message: string;
    at: string;
    metadata: {
      ip: string;
      host: string;
      user_agent: string;
    };
  };
}

export interface UserRegistrationData {
  login: string;
  first_name: string;
  last_name: string;
}

export interface SessionCreationData {
  login: string;
  password?: string;
}

export interface OTPMFAuth {
  otp: string;
}

export interface MFAuthentication {
  auth_links: string[];
  success: string;
}

export interface MFAManage {
  setup_links: string[];
  remove_links: string[];
}
export interface WebAuthKey {
  id: string;
  webauthn_id: string;
  public_key: string;
  sign_count: string;
  last_use: string;
}