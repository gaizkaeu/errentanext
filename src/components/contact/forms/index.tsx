"use client";
import { Organization } from "@/store/types/Organization"
import { useAuth } from "@/components/providers/authProvider";
import { GoogleSignInButton, SignInModal } from "@/components/authentication";
import { SignUpForm } from "@/components/authentication/forms/sign-up-form";

export const ContactForm = (props: { org: Organization }) => {

  const { currentUser } = useAuth(); 


  return (
    <div className="relative">
      {!currentUser && (
      <div className="grid grid-cols-1 md:grid-cols-2 space-y-3 gap-3 inset-x-0 bg-gray-50 dark:bg-midnight-700 p-2 shadow-md rounded-lg">
        <div className="grid grid-cols-1 my-auto gap-3">
          <p className="text-center text-sm text-gray-500 dark:text-gray-400">Contacta con {props.org.attributes.name} o calcula un presupuesto.</p> 
          <GoogleSignInButton redirectUrl={`/organizations/${props.org.id}`} />
          <SignInModal />
        </div>
        <div>
          <p className="text-center text-sm text-gray-500 dark:text-gray-400">¿No tienes cuenta? <span className="text-blue-500 cursor-pointer">continúa con email, nombre y apellido.</span></p>
          <SignUpForm afterLogin={() => {}} />
        </div>
      </div>
      )}
    </div>

  )
}