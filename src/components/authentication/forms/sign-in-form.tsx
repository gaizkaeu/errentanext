"use client"
import InputField from "@/components/fields/InputField";
import { Button } from "@/components/ui/button"
import { useLoginAccountMutation } from "@/store/endpoints/userAccounts";
import { SessionCreationData } from "@/store/types/User";
import { Form, Formik, FormikHelpers } from "formik";
import Link from "next/link"
import { useRouter } from "next/navigation";

export const SignInForm = () => {

  const [signIn] = useLoginAccountMutation();
  const r = useRouter();

  const onSubmit = (values: SessionCreationData, h: FormikHelpers<SessionCreationData>) => {
    signIn(values).unwrap().then(() => {
      r.push('/dashboard')
    })
    .finally(() => h.setSubmitting(false));
  }

  return (
    <Formik onSubmit={onSubmit} initialValues={{ login: "", password: "" } as SessionCreationData}>
      {({ isSubmitting }) => (
      <Form className="mt-8 space-y-6" action="#" method="POST">
        <input type="hidden" name="remember" defaultValue="true" />
        <div className="-space-y-px">
          <div>
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
            <InputField placeholder="Email address" name="login" className="w-full" />
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
  );
}