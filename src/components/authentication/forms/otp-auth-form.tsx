"use client";
import { InputField } from "@/components/fields";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useMfaOTPAuthMutation } from "@/store/endpoints/authentication";
import { Form, Formik, FormikHelpers } from "formik";
import { useState } from "react";

export const OTPForm = ({onSuccess} : {onSuccess: () => void}) => {
  const [error, setError] = useState<string | undefined>(undefined);
  const [optMutation] = useMfaOTPAuthMutation();

  const handleSubmit = (
    values: { otp: string },
    helpers: FormikHelpers<{ otp: string }>
  ) => {
    optMutation(values)
      .unwrap()
      .then((_response) => {
        helpers.setSubmitting(false);
        onSuccess();
      })
      .catch((err) => {
        setError(err.data.error);
        helpers.setErrors({ otp: err.data["field-error"][1] });
      });
  };

  return (
    <Formik initialValues={{ otp: "" }} onSubmit={handleSubmit}>
      <Form>
        {error}
        <br />
        <Label htmlFor="otp">OTP</Label>
        <InputField
          type="text"
          name="otp"
          id="otp-auth-code"
        />
        <Button type="submit">Enviar</Button>
      </Form>
    </Formik>
  )

}

