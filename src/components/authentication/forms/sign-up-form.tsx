import { InputField } from "@/components/fields"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { UserRegistrationData } from "@/store/types/User"
import { Form, Formik, FormikHelpers } from "formik"
import { useState } from "react"

export const SignUpForm = ({ afterLogin, initialEmail }: { afterLogin: () => void, initialEmail?: string }) => {

  const [error, setError] = useState("")

  const signUp = (data: UserRegistrationData, helpers: FormikHelpers<UserRegistrationData>) => {

  }

  return (
    <Formik onSubmit={signUp} initialValues={{ first_name: "", last_name: "", login: initialEmail ?? '' }} >
      {({ isSubmitting, values }) => (
        <Form className="space-y-2" action="#" method="POST">
          <input type="hidden" name="remember" defaultValue="true" />
          {error && <div>{error}</div>}
          <div>
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
            <InputField placeholder="Email address" name="login" className="w-full" />
          </div>
          <div>
            <Label htmlFor="first-name">
              First Name
            </Label>
            <InputField placeholder="First Name" name="first-name" className="w-full" />
          </div>
          <div>
            <Label htmlFor="last-name" >
              Last Name
            </Label>
            <InputField placeholder="Last name" name="last-name" className="w-full" />
          </div>
          <div>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="group relative flex w-full justify-center"
            >
              Sign Up
            </Button>
          </div>
        </Form>
      )}
    </Formik >
  )

}