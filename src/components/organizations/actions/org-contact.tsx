"use client";
import { Button } from "@/components/ui/button"
import { Organization } from "@/store/types/Organization";
import { useAhoy } from "@/components/providers";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { GoogleSignInButton, SignInForm } from "@/components/authentication";
import { useAuth } from "@/components/providers/authProvider";
import { useRouter } from "next/navigation";

const ContactButton = (props: { org: Organization }) => {

  const { ahoy } = useAhoy();
  const [open, setOpen] = useState(false);
  const { currentUser } = useAuth();
  const r = useRouter();

  const handleClick = () => {
    if (currentUser) {
      r.push(`/organizations/${props.org.id}/contact`);
    } else {
      setOpen(true);
    }
  }

  return (
    <>
    <Button variant="ghost"  onClick={handleClick}className="rounded-full border border-blue-700 text-blue-800 dark:border-blue-200">
      Quiero contactar ahora
    </Button>
    <Dialog open={open}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Contactar con {props.org.attributes.name}</DialogTitle>
          <DialogDescription>
            {props.org.attributes.name} suele responder rápidamente.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Para continuar necesitamos información adicional.
          </p>
          <GoogleSignInButton redirectUrl={`/organizations/${props.org.id}/contact`} />
          <SignInForm afterLogin={() => {setOpen(false); r.push(`/organizations/${props.org.id}/contact`)}}/>
        </div>
      </DialogContent>
    </Dialog>
    </>
  )
}

export { ContactButton }