"use client";
import { useLocalizedMoment } from "@/lib/utils";
import { useGetOrganizationByIdQuery } from "@/store/endpoints/organizations";
import { Organization } from "@/store/types/Organization";
import { motion } from "framer-motion";

export const OrganizationOpen = (props: { org_id: string }) => {
  const { currentData } = useGetOrganizationByIdQuery(props.org_id);
  const s = useLocalizedMoment();

  // if (props.org.attributes.open) {
  //   if (props.org.attributes.near_close) {
  //     return <>Cierra en menos de 30 minutos.</>
  //   } else {
  //     return <>Abierto ahora.</>
  //   }
  // } else {
  //   return <>Abre {s(props.org.attributes.nearest_open_time).calendar()}.</>
  // }

  return (
    <motion.div 
    initial={{ y: -100 }}
    animate={{ y: 0 }}

    className="top-20 h-16 z-50 bg-green-600 w-full grid grid-cols-1">
      <p className="text-white text-2xl font-bold my-auto text-center">Abierto ahora.</p>
      
    </motion.div>
  )

}