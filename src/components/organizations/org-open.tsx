"use client";
import { useLocalizedMoment } from "@/lib/utils";
import { Organization } from "@/store/types/Organization";

export const OrganizationOpen = (props: { org: Organization }) => {
  const s = useLocalizedMoment();

  if (props.org.attributes.open) {
    if (props.org.attributes.near_close) {
      return <>Cierra en menos de 30 minutos.</>
    } else {
      return <>Abierto ahora.</>
    }
  } else {
    return <>Abre {s(props.org.attributes.nearest_open_time).calendar()}.</>
  }

}