"use client";
import { useRouter, useSearchParams } from "next/navigation"
import { SignInForm } from "../forms/sign-in-form";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export const SignInComponent = () => {

  const r = useRouter();
  const s = useSearchParams();

  const afterLogin = () => {
    const from = s.get('from');

    if (from) {
      r.push(decodeURIComponent(from));
    } else {
      r.push('/dashboard');
    }
  }

  return (
    <SignInForm afterLogin={afterLogin} />
  )
}

export const SingInDialog = (props: {children: JSX.Element}) => {
  return (
    <Dialog>
      <DialogTrigger>
        {props.children}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Empezar declaración</DialogTitle>
          <DialogDescription>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}