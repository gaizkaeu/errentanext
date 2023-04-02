"use client";
import { Button } from "@/components/ui/button"
import { Organization } from "@/store/types/Organization";
import { useAhoy } from "@/components/providers";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { GoogleSignInButton, SignInForm } from "@/components/authentication";

const ContactButton = (props: { org: Organization }) => {

  const { ahoy } = useAhoy();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div>
        <Button variant="ghost" className="rounded-full border border-blue-700 text-blue-800 dark:border-blue-200">
          Quiero contactar ahora
        </Button>
        <p className="text-xs text-blue-800 text-center dark:text-white">Respuesta en {"<"} 2 minutos</p>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Contactar con {props.org.attributes.name}</DialogTitle>
          <DialogDescription>
            Respuesta medía en {"<"} <span className="relative">2<span className="animate-ping inline-flex absolute h-5 w-5 inset-x-0 rounded-full bg-green-500 opacity-75" /> </span>minutos
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Para continuar necesitamos información adicional.
          </p>
          <GoogleSignInButton redirectUrl="/dashboard" />
          <SignInForm afterLogin={() => {}}/>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export { ContactButton }