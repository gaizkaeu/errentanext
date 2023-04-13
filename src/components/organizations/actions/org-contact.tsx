"use client";
import { Button } from "@/components/ui/button"
import { Organization } from "@/store/types/Organization";
import { useState } from "react";
import Popover from "@/components/ui/popover-card";
import { CallCreateForm } from "@/components/contact";

export const OrgContactButton = (props: {
  org: Organization,
}) => {

  const [openPopover, setOpenPopover] = useState(false);

  return (
    <Popover content={
      <CallCreateForm org={props.org} />
    }
      openPopover={openPopover}
      setOpenPopover={setOpenPopover}
    >
      <Button onClick={() => setOpenPopover(true)} className="w-full text-white dark:text-white bg-gradient-to-br hover:opacity-90 from-green-400 to-blue-600 focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2" >
        Contactar ahora.
      </Button>
    </Popover>
  );
};
