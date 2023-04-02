"use client";
import { PhoneField } from "@/components/fields";
import { FormSection } from "@/components/ui/form-section";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Organization } from "@/store/types/Organization";
import { Form, Formik } from "formik"

import 'react-phone-number-input/style.css'
import { SkillSelectField } from "../../shared";

export const CallCreateForm = (props: { org: Organization }) => (
  <Formik initialValues={{ org_id: props.org.id, phone: "", date: "", skill_list: [] }} onSubmit={() => { }}>
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
          </Tabs>
        </FormSection>
        <FormSection title="¿Sobre que necesitas ayuda?" description={""} note={""}>
          <SkillSelectField name="skill_list" skill_list={props.org.attributes.skill_list}/>
        </FormSection>
      </div>
    </Form>
  </Formik>
)