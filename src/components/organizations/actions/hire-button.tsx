import { TaxCreateForm } from "@/components/tax_incomes/forms"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

const HireButton = ({ org_id }: { org_id: string }) => {

  return (
    <Dialog>
      <DialogTrigger>
        <Button>
          Empezar declaracion
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Empezar declaración</DialogTitle>
          <DialogDescription>
            <TaxCreateForm org_id={org_id} />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export { HireButton }