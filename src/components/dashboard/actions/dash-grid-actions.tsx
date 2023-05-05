import { cn } from "@/lib/utils";
import { ArrowUpRightIcon, GlobeAltIcon, PaperAirplaneIcon, QuestionMarkCircleIcon, WrenchScrewdriverIcon } from "@heroicons/react/24/outline";
import { cva } from "class-variance-authority";
import Link from "next/link";

export const DashGridActions = () => {

  return (
    <div className="bg-slate-50 dark:bg-midnight-800 rounded-xl overflow-hidden">
      <div className="grid lg:grid-cols-2 grid-cols-1 divide-x dark:border-midnight-700">
        <div className="grid grid-cols-1 divide-y dark:border-midnight-700">
          <Action title="Mis presupuestos" color="yellow" description="Ver todos mis presupuestos." href="/tax_incomes" >
            <PaperAirplaneIcon className="h-8" />
          </Action>
          <Action title="Explorar organizacaciones" color="green" description="Encuentra todas las asesorías disponibles por tu zona." href="" >
            <GlobeAltIcon className="h-8" />
          </Action>
        </div>
        <div className="grid grid-cols-1 divide-y dark:border-midnight-700">
          <Action title="Configuración de mi cuenta" color="purple" description="Puedes administrar tu cuenta, ver tus pagos y gestionar las notificaciones." href="" >
            <WrenchScrewdriverIcon className="h-8" />
          </Action>
          <Action title="Ayuda" color="red" description="Contacta con nuestro departamento de soporte." href="" >
            <QuestionMarkCircleIcon className="h-8" />
          </Action>
        </div>
      </div>
    </div>
  )

}

const actionIconVariant = cva(
  "p-1 w-fit rounded-lg font-light",
  {
    variants: {
      variant: {
        green: "bg-green-100 text-green-700",
        yellow: "bg-yellow-100 text-yellow-700",
        red: "bg-red-100 text-red-700",
        purple: "bg-purple-100 text-purple-700"
      },
    }
  });

const Action = (props: { title: string, children?: JSX.Element, description: string, href: string, color?: "green" | "yellow" | "purple" | "red" }) => {

  return (

    <Link href={props.href}>
      <div className="transition-all h-48 p-3 hover:bg-slate-200  hover:dark:bg-slate-800">
        <div className="flex items-center">
          <div className="flex-1">
            <div className={cn(actionIconVariant({ variant: props.color ?? 'green' }))}>
              {props.children}
            </div>
          </div>
          <div>
            <ArrowUpRightIcon className="h-6" />
          </div>
        </div>
        <div className="mt-8">
          <p className="font-bold text-lg">
            {props.title}
          </p>
          <p>
            {props.description}
          </p>
        </div>
      </div>
    </Link>
  );
}