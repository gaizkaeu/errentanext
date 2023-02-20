"use client";

import InputField from "@/components/fields/InputField";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useCreateTaxIncomeMutation } from "@/store/endpoints/taxIncomes";
import { TaxIncomeData } from "@/store/types/TaxIncome";
import { ErrorMessage, Form, Formik, FormikHelpers } from "formik";
import { useRouter } from "next/navigation";

const TaxCreateForm = ({ org_id } : { org_id?: string }) => {

  const [create, {isError}] = useCreateTaxIncomeMutation();
  const r = useRouter();

  const onSubmit = (values: Partial<TaxIncomeData>, helpers: FormikHelpers<Partial<TaxIncomeData>>) => {
    create(values).unwrap().then((tax) => {
      r.push(`/tax_incomes/${tax.id}`);
    }).catch((err) => {
      helpers.setErrors(err.data);
      helpers.setSubmitting(false);
    });
  }

  return (
    <Formik initialValues={{organization_id: org_id ?? '', year: 2023, estimation: {token: ''}}} onSubmit={onSubmit}>
      <Form>
        <div className="flex flex-col space-y-3">
          <ErrorMessage name={"error"} />
          <Label htmlFor="year">Año</Label>
          <InputField type="number" name="year" id="year" />
          <Button type="submit" variant={isError ? "destructive" : "default"}>Comenzar</Button>
        </div>
      </Form>
    </Formik>
  )

}

export { TaxCreateForm }