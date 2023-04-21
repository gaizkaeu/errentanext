import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { CalculationManage } from "@/store/types/Calculator";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { CalculationEditForm } from "../forms";
import { Organization } from "@/store/types/Organization";

export const CalculationEditButton = (props: { calculation: CalculationManage, org_id: string }) => {

  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="outline" className="w-5 h-5 rounded-full p-0">
          <PencilSquareIcon className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Calculation</DialogTitle>
        </DialogHeader>
        <CalculationEditForm {...props} />
      </DialogContent>
    </Dialog>
  )
}