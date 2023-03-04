"use client";
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Organization } from "@/store/types/Organization";
import { CalculatorIcon } from "@heroicons/react/24/outline";
import { useAhoy } from "@/components/providers";

const OrganizationCalculateButton = (props: { size: "big" | "small", org: Organization }) => {

  const { ahoy } = useAhoy();

  return (
    <Dialog onOpenChange={(open) => ahoy.track("org_calculate", {org_id: props.org.id, open: open})}>
      <DialogTrigger>
        <Button variant="subtle">
          <span className="sr-only">Calcular presupuesto en {props.org.attributes.name}</span>
          <CalculatorIcon className="h-6" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Calcular presupuesto</DialogTitle>
          <DialogDescription>
            Obten un precio aproximado en {props.org.attributes.name}.
          </DialogDescription>
        </DialogHeader>

        Componente de cálculo
      </DialogContent>
    </Dialog>
  )
}

export { OrganizationCalculateButton }