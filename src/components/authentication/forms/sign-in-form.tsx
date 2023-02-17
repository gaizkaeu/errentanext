"use client"
import InputField from "@/components/fields/InputField";
import { Button } from "@/components/ui/button"
import { useAuth } from "@/components/providers/authProvider"
import { useLoginAccountMutation } from "@/store/endpoints/userAccounts";
import { SessionCreationData } from "@/store/types/User";
import { Form, Formik, FormikHelpers } from "formik";
import Link from "next/link"

export const SignInForm = () => {

  const [signIn] = useLoginAccountMutation();
  const { isAuthenticated } = useAuth();

  const onSubmit = (values: SessionCreationData, h: FormikHelpers<SessionCreationData>) => {
    signIn(values).unwrap().then(() => {
      
    })
    .finally(() => h.setSubmitting(false));
  }

  return !isAuthenticated ? (
    <Formik onSubmit={onSubmit} initialValues={{ login: "", password: "" } as SessionCreationData}>
      {({ isSubmitting }) => (
      <Form className="mt-8 space-y-6" action="#" method="POST">
        <input type="hidden" name="remember" defaultValue="true" />
        <div className="-space-y-px rounded-md shadow-sm">
          <div>
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
            <InputField placeholder="Email address" name="login" />
          </div>
          <br />
          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <InputField placeholder="Password" name="password" type="password" />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-sm underline">
            <Link href="#">
              Forgot your password?
            </Link>
          </div>
        </div>

        <div>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="group relative flex w-full justify-center"
          >
            Sign in
          </Button>
        </div>
      </Form>
      )}
    </Formik>
  ) : <p>ya estas</p>
}