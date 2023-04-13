"use client";
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { SignInForm } from "@/components/authentication";
import { useAuth } from "@/components/providers/authProvider";
import { useRouter } from "next/navigation";

const SignInModal = () => {

  const [open, setOpen] = useState(false);
  const { currentUser } = useAuth();
  const r = useRouter();

  useEffect(() => {
    if (currentUser) {
      setOpen(false);
    }
  }, [currentUser])

  return (
    <>
    <Dialog open={open} onOpenChange={setOpen} >
      <DialogTrigger>
        <Button className="w-full">
          Iniciar sesión con ERRENTA
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Iniciar sesión</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Para continuar necesitamos información adicional.
          </p>
          <SignInForm afterLogin={() => setOpen(false)}/>
        </div>
      </DialogContent>
    </Dialog>
    </>
  )
}

export { SignInModal }