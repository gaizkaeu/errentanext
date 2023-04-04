"use client";
import { PhoneField } from "@/components/fields";
import { FormSection } from "@/components/ui/form-section";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Organization } from "@/store/types/Organization";
import { Form, Formik } from "formik"

import 'react-phone-number-input/style.css'
import { SkillSelectField } from "../../shared";
import { Textarea } from "@/components/ui/text-area";
import { Button } from "@/components/ui/button";
import { TabsContent } from "@radix-ui/react-tabs";
import { useLocalizedMoment } from "@/lib/utils";

export const CallCreateForm = (props: { org: Organization }) => {

  const s = useLocalizedMoment();


  return (
    <Formik initialValues={{ org_id: props.org.id, phone_number: "", call_at: "", interested_in: [] }} onSubmit={() => { }}>
      <Form>
        <div className="flex flex-col gap-4">
          <FormSection title="¿Cuál es tu número de teléfono?" description={""} note={"Asegurate de no equivocarte"}>
            <PhoneField name="phone" />
          </FormSection>
          <FormSection title="¿Cuándo quieres que te llamemos?" description={""} note={"Asegurate de no equivocarte"}>
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
          </FormSection>
          <FormSection title="¿Sobre que necesitas ayuda?" description={""} note={""}>
            <SkillSelectField name="skill_list" skill_list={props.org.attributes.skill_list} />
            <br />
            <Textarea name="message" placeholder="Escribe un mensaje opcional" />
          </FormSection>
        </div>
        <br />
        <Button type="submit" className="w-full">Enviar</Button>
      </Form>
    </Formik>
  )
}