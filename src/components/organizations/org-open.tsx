"use client";
import { cn, useLocalizedMoment } from "@/lib/utils";
import { useGetOrganizationByIdQuery } from "@/store/endpoints/organizations";
import { cva } from "class-variance-authority";
import { motion } from "framer-motion";

const bannerVariants = cva(
  "top-20 h-16 z-50 w-full grid grid-cols-1",
  {
    variants: {
      variant: {
        open:
          "bg-green-600",
        near_close:
          "bg-yellow-600",
        closed:
          "bg-red-600",
      },
    },
    defaultVariants: {
      variant: "open",
    },
  }
)

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

  return currentData ? (
    <motion.div 
    initial={{ y: -100 }}
    animate={{ y: 0 }}
    className={cn(bannerVariants({ 
      variant: currentData.attributes.open ? currentData.attributes.near_close ? "near_close" : "open" : "closed",
     }))}>
      <p className="text-white text-center font-bold text-xl my-auto">
     {currentData.attributes.open ? currentData.attributes.near_close ? "Cierra en menos de 30 minutos." : "Abierto ahora." : `Abre ${s(currentData.attributes.nearest_open_time).calendar()}.`}
      </p>
    </motion.div>
  ) : <></>

}