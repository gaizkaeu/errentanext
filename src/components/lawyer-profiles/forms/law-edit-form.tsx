"use client";
import { Form, Formik, FormikHelpers } from "formik"
import { Contact, Tags } from "./law-form-sections";
import { LawyerProfile, LawyerProfileAttributes } from "@/store/types/LawyerProfile";
import { useUpdateMyLawyerProfileMutation } from "@/store/endpoints/lawyerProfiles";

export const LawyerEditForm = (props: {law: LawyerProfile}) => {

  const [mutation] = useUpdateMyLawyerProfileMutation();

  const submit = (values: Partial<LawyerProfileAttributes>, helpers: FormikHelpers<Partial<LawyerProfileAttributes>>) => {


    mutation(values).unwrap().then(() => {
      helpers.setSubmitting(false);
    });
  }

  return (
    <Formik initialValues={{skill_list: props.law.attributes.skill_list}} onSubmit={submit}>
      <Form>
        <Contact />
        <br />
        <Tags />
      </Form>
    </Formik>
  )
}