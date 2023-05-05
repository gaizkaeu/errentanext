"use client";
import { InputField } from "@/components/fields";
import { Button } from "@/components/ui/button";
import { useLocalizedMoment } from "@/lib/utils";
import { useUpdateOrganizationByIdMutation } from "@/store/endpoints/organizations";
import { Organization } from "@/store/types/Organization";
import { Form, Formik } from "formik";
import { useState } from "react";

export const OrgOpenCloseHoursEdit = (props: { organization: Organization }) => {
  const [mutation] = useUpdateOrganizationByIdMutation();

  const [hours, setHours] = useState<any>(props.organization.attributes.open_close_hours);
  const s = useLocalizedMoment();

  const onSubmit = (values: any) => {
    const utc_hours:any = {};

    Object.keys(values).map(day => {
      utc_hours[day] = {
        open: s(values[day].open, "HH:mm").utc().format("HH:mm"),
        close: s(values[day].close, "HH:mm").utc().format("HH:mm")
      }
    })

    const update_data = {
      open_close_hours: utc_hours
    }

    mutation({ id: props.organization.id, ...update_data })
  }

  const formattedHours = () => {
    const localized:any = {};

    Object.keys(hours).map(day => {
      localized[day] = {
        open: s.utc(hours[day].open, "HH:mm").local().format("HH:mm"),
        close: s.utc(hours[day].close, "HH:mm").local().format("HH:mm")
      }
    })

    return localized;
  }

  return (
    <div>
      <Formik initialValues={formattedHours()} onSubmit={onSubmit}>
        <Form>
        {Object.keys(hours).map(day => (
          <div key={day}>
            <h3>{day}</h3>
            <label>Open:</label>
            <InputField
              type="time"
              name={`${day}[open]`}
            />
            <label>Close:</label>
            <InputField
              type="time"
              name={`${day}[close]`}
            />
          </div>
        ))}
        <Button type="submit">
          Guardar
        </Button>
        </Form>
      </Formik>
    </div>
  );
};
