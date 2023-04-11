"use client";
import { InputField } from "@/components/fields";
import { Button } from "@/components/ui/button"
import { authenticate } from "@/lib/utils/webauth";
import { useRequestEmailAuthMutation, useWebAuthnAuthMutation } from "@/store/endpoints/authentication";
import { useLoginAccountMutation } from "@/store/endpoints/userAccounts";
import { SessionCreationData } from "@/store/types/User";
import { Form, Formik, FormikHelpers } from "formik";
import Link from "next/link"
import { useState } from "react";
import { SignUpForm } from "./sign-up-form";

const WebAuthnAuth = (props: { login: string; afterLogin: () => void }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [loginWebAuthnRequest, { isError, isUninitialized }] =
    useWebAuthnAuthMutation();

  const authenticateButton = () => {
    setLoading(true);
    loginWebAuthnRequest({ login: props.login })
      .unwrap()
      .catch(async (err) => {
        if (err.data.webauthn_auth) {
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
        } else {
          setError("You can sign in with webauthn")
        }
      });
  };

  return (
    <>
      {error && !loading && <div>{error}</div>}
      <Button
        variant="subtle"
        className="flex-1"
        size="sm"
        type="button"
        onClick={() => {
          authenticateButton();
        }}
      >
        {isUninitialized || loading
          ? "Certificado"
          : "Error"}
      </Button>
    </>
  );
};

const EmailAuth = (props: { login: string }) => {
  const [loginEmailRequest, { isError, isUninitialized, error }] =
    useRequestEmailAuthMutation();

  return (
    <>
      {/* {error && <div>{error.data.error}</div>} */}
      <Button
        className="flex-1"
        variant="subtle"
        type="button"
        size="sm" 
        onClick={() => {
          loginEmailRequest(props);
        }}
      >
        {isUninitialized
          ? "Email Auth"
          : isError
          ? "Error"
          : "Enviado"}
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
      <div className="flex flex-wrap w-full gap-y-2 gap-3">
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


export const SignInForm = ({afterLogin} : {afterLogin: () => void}) => {

  const [recognized, setRecognized] = useState(false);
  const [first_recognized, setFirstRecognized] = useState(false);
  const [email, setEmail] = useState<string | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<string | undefined>(undefined);
  const [loginMutation] = useLoginAccountMutation();

  const handleRecognize = (
    values: SessionCreationData,
    helpers: FormikHelpers<any>
  ) => {
    setError(undefined);
    setEmail(values.login);
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
        setFirstRecognized(true);
        helpers.setErrors({ login: error.data["field-error"][1] });
      });

    helpers.setSubmitting(false);
  };

  const login = (data: SessionCreationData, helpers: FormikHelpers<any>) => {
    helpers.setSubmitting(true);
    loginMutation(data)
      .unwrap()
      .then((_response) => {
        afterLogin();
        helpers.setSubmitting(false);
      })
      .catch((_error) => {
        helpers.setSubmitting(false);
        helpers.setErrors({ password: "Invalid" });
      });
  };

  return !first_recognized ? (
    <Formik onSubmit={recognized ? login : handleRecognize} initialValues={{ login: "", password: undefined } as SessionCreationData}>
      {({ isSubmitting, values }) => (
      <Form className="space-y-2" action="#" method="POST">
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
              afterLogin={afterLogin}
            />
          )}
        </div>
        <div>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="group relative flex w-full justify-center"
          >
            {recognized ? "Inciar sesion" : "Continuar"}
          </Button>
        </div>
      </Form>
      )}
    </Formik>
  ) : <SignUpForm afterLogin={afterLogin} initialEmail={email} />;
}