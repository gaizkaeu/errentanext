import { TaxCreateForm } from "@/components/tax_incomes";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { LawyerProfile } from "@/store/types/LawyerProfile";

export const LawyerEditButton = (props: { lawyer: LawyerProfile }) => {

  return (
    <Dialog>
      <DialogTrigger>
        <Button>
          Editar
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar abogado {props.lawyer.id}</DialogTitle>
          <DialogDescription>
          
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}