"use client";
import { Organization } from "@/store/types/Organization"
import { CallCreateForm } from "../call"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/components/providers/authProvider";
import { GoogleSignInButton, SignInModal } from "@/components/authentication";
import { SignUpForm } from "@/components/authentication/forms/sign-up-form";

export const ContactForm = (props: { org: Organization }) => {

  const { currentUser } = useAuth(); 


  return (
    <div className="relative">
      {!currentUser && (
      <div className="sticky top-28 z-20 grid grid-cols-1 space-y-3 inset-x-0 bg-gray-50 dark:bg-midnight-700 p-2 shadow-md rounded-lg">
        <p className="text-center text-sm text-gray-500 dark:text-gray-400">Contacta con {props.org.attributes.name} o calcula un presupuesto.</p> 
        <GoogleSignInButton redirectUrl={`/organizations/${props.org.id}`} />
        <SignInModal />
        <p className="text-center text-sm text-gray-500 dark:text-gray-400">¿No tienes cuenta? <span className="text-blue-500 cursor-pointer">continúa con email, nombre y apellido.</span></p>
        <SignUpForm afterLogin={() => {}} />
      </div>
      )}
    <Tabs defaultValue="call" className={`w-full max-w-sm mx-auto mt-2 ${!currentUser && "blur-sm"}`}>
      <TabsList>
        <TabsTrigger value="call">
          <div>
            <p>Quiero que me llamen</p>
          </div>
        </TabsTrigger>
        <TabsTrigger value="message">
          <div>
            <p>Enviar un mensaje</p>
          </div>
        </TabsTrigger>
      </TabsList>
      <TabsContent value="call">
        <CallCreateForm org={props.org} />
      </TabsContent>
      <TabsContent value="message">
      </TabsContent>
    </Tabs>
    </div>
  )
}