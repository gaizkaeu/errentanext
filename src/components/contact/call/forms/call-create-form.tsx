"use client";
import { PhoneField } from "@/components/fields";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Organization } from "@/store/types/Organization";
import { Form, Formik, FormikHelpers } from "formik"

import 'react-phone-number-input/style.css'
import { SkillSelectField } from "../../shared";
import { Textarea } from "@/components/ui/text-area";
import { Button } from "@/components/ui/button";
import { TabsContent } from "@radix-ui/react-tabs";
import { useLocalizedMoment } from "@/lib/utils";
import { useAuth } from "@/components/providers/authProvider";
import { Call, CallAttributes } from "@/store/types/Call";
import { useCreateCallMutationMutation } from "@/store/endpoints/calls";
import { useState } from "react";
import { useGetCalculationQuery } from "@/store/endpoints/calculations";
import { CalculationComponent } from "@/components/calculate";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetOrganizationByIdQuery } from "@/store/endpoints/organizations";

export const CallCreateFormWrapper = (props: { org_id: string, calc_id: string }) => {
  const {data} = useGetOrganizationByIdQuery(props.org_id);

  return data ? <CallCreateForm org={data} calc_id={props.calc_id} /> : <Skeleton />
}

export const CallCreateForm = (props: { org: Organization, calc_id?: string }) => {

  const s = useLocalizedMoment();
  const [mutation] = useCreateCallMutationMutation();
  const [call, setCall] = useState<Call | null>(null);
  const { currentUser } = useAuth();

  const onSubmit = (values: CallAttributes, helpers: FormikHelpers<any>) => {

    mutation(values).unwrap().then((call) => {
      setCall(call);
    }).catch((err) => {
      helpers.setErrors(err.data);
    });

  }


  return currentUser ? (
    call ? <CallCreated call={call} /> : (
      <Formik initialValues={{ calculation_id: props.calc_id, organization_id: props.org.id, phone_number: "", call_time: "", interested_in: [] }} onSubmit={onSubmit}>
        {({values}) => (
        <Form>
          <div className="flex flex-col gap-4">
            <p className="text-lg font-semibold">¿Cuál es tu número de teléfono?</p>
            <PhoneField name="phone" />
            <p className="text-lg font-semibold">¿Cuándo quieres que te llamemos?</p>
            <Tabs defaultValue="now">
              <TabsList>
                <TabsTrigger value="now">
                  <p>Ahora</p>
                </TabsTrigger>
                <TabsTrigger value="later">
                  <p>Más tarde</p>
                </TabsTrigger>
              </TabsList>
              <TabsContent value="now">
                {props.org.attributes.open ? (
                  <>
                    <p>Estamos abiertos ahora.</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Te llamaremos en menos de 5 minutos.
                    </p>
                  </>
                ) : (
                  <>
                    <p>Estamos cerrados ahora.</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Te llamaremos {s(props.org.attributes.nearest_open_time).calendar()}
                    </p>
                  </>
                )}
              </TabsContent>
              <TabsContent value="later">
                <p>Te llamaremos más tarde</p>
              </TabsContent>
            </Tabs>
            <p className="text-lg font-semibold">Información adicional</p>
            {values.calculation_id ? (
              <Calculation calc_id={values.calculation_id} />
            ) : (
              <SkillSelectField name="skill_list" skill_list={props.org.attributes.skill_list ?? []} />
            )}
            <Textarea name="message" placeholder="Escribe un mensaje opcional" />
          </div>
          <br />
          <Button type="submit" className="w-full">Enviar</Button>
        </Form>
        )}
      </Formik>
    )
  ) : <></>
}

const CallCreated = (props: { call: Call }) => {

  return (
    <p>hecho!</p>
  )
}

const Calculation = (props: { calc_id: string }) => {

  const {data} = useGetCalculationQuery(props.calc_id);

  return data ?
    <CalculationComponent calcn={data} />
  : 
    <Skeleton className="w-full h-96" />
}