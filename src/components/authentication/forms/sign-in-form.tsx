"use client";
import InputField from "@/components/fields/InputField";
import { Button } from "@/components/ui/button"
import { authenticate } from "@/lib/utils/webauth";
import { useRequestEmailAuthMutation, useWebAuthnAuthMutation } from "@/store/endpoints/authentication";
import { useLoginAccountMutation } from "@/store/endpoints/userAccounts";
import { SessionCreationData } from "@/store/types/User";
import { Form, Formik, FormikHelpers } from "formik";
import { useTranslations } from "next-intl";
import Link from "next/link"
import { useRouter } from "next/navigation";
import { useState } from "react";

const WebAuthnAuth = (props: { login: string; afterLogin: () => void }) => {
  const [loading, setLoading] = useState(false);
  const t = useTranslations();
  const [loginWebAuthnRequest, { isError, isUninitialized, error }] =
    useWebAuthnAuthMutation();

  const authenticateButton = () => {
    setLoading(true);
    loginWebAuthnRequest({ login: props.login })
      .unwrap()
      .catch(async (err) => {
        authenticate(err.data.webauthn_auth).then((auth) => {
          loginWebAuthnRequest({
            login: props.login,
            webauthn_auth: auth,
            webauthn_auth_challenge: err.data.webauthn_auth_challenge,
            webauthn_auth_challenge_hmac: err.data.webauthn_auth_challenge_hmac,
          })
            .unwrap()
            .then(() => {
              props.afterLogin();
            })
            .finally(() => setLoading(false));
        });
      });
  };

  return (
    <>
      {/* {error && !loading && <div>{error.data.error}</div>} */}
      <Button
        color={loading ? "primary" : isError ? "error" : "success"}
        className="flex-1"
        size="sm"
        onClick={() => {
          authenticateButton();
        }}
      >
        {isUninitialized || loading
          ? t("authentication.webauthn.login.title")
          : t("global.error")}
      </Button>
    </>
  );
};

const EmailAuth = (props: { login: string }) => {
  const t = useTranslations();
  const [loginEmailRequest, { isError, isUninitialized, error }] =
    useRequestEmailAuthMutation();

  return (
    <>
      {/* {error && <div>{error.data.error}</div>} */}
      <Button
        color={isUninitialized ? "primary" : isError ? "error" : "success"}
        className="flex-1"
        size="sm"
        onClick={() => {
          loginEmailRequest(props);
        }}
      >
        {isUninitialized
          ? t("authentication.email-link.title")
          : isError
          ? t("global.error")
          : t("authentication.email-link.sent")}
      </Button>
    </>
  );
};

const RecognizedAccount = (props: {
  login: string;
  afterLogin: () => void;
}) => {
  return (
    <>
      <InputField type="password" name="password" id="password" />
      <br />
      <div className="flex flex-wrap w-full gap-y-2">
        <EmailAuth {...props} />
        <WebAuthnAuth {...props} />
      </div>
      <br />
      <div className=" mt-3 flex items-center justify-between">
        <div className="text-sm underline">
          <Link href="#">
            Forgot your password?
          </Link>
        </div>
      </div>
    </>
  );
};


export const SignInForm = () => {

  const [recognized, setRecognized] = useState(false);
  const t = useTranslations();
  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<string | undefined>(undefined);
  const [loginMutation] = useLoginAccountMutation();
  const r = useRouter();

  const handleRecognize = (
    values: SessionCreationData,
    helpers: FormikHelpers<any>
  ) => {
    setError(undefined);
    loginMutation(values)
      .unwrap()
      .then((response) => {
        if (response.success === "Login recognized, please enter your password")
          setRecognized(true);
        else {
          setSuccess(response.success);
        }
      })
      .catch((error) => {
        setError(error.data.error);
        helpers.setErrors({ login: error.data["field-error"][1] });
      });

    helpers.setSubmitting(false);
  };

  const login = (data: SessionCreationData, helpers: FormikHelpers<any>) => {
    helpers.setSubmitting(true);
    loginMutation(data)
      .unwrap()
      .then((_response) => {
        helpers.setSubmitting(false);
      })
      .catch((_error) => {
        helpers.setSubmitting(false);
        helpers.setErrors({ password: "Invalid" });
      });
  };

  return (
    <Formik onSubmit={recognized ? login : handleRecognize} initialValues={{ login: "", password: undefined } as SessionCreationData}>
      {({ isSubmitting, values }) => (
      <Form className="mt-8 space-y-6" action="#" method="POST">
        <input type="hidden" name="remember" defaultValue="true" />
        {error && <div>{error}</div>}
        {success && <div>{success}</div>}
        <div className="-space-y-px">
          <div>
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
            <InputField placeholder="Email address" name="login" className="w-full" disabled={recognized} />
          </div>
          <br />
          {recognized && (
            <RecognizedAccount
              login={values.login}
              afterLogin={() => {}}
            />
          )}
        </div>
        <div>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="group relative flex w-full justify-center"
          >
            {recognized ? t("authentication.signIn") : t("global.continue")}
          </Button>
        </div>
      </Form>
      )}
    </Formik>
  );
}