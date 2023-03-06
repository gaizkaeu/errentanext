import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { OrganizationJoinRequestForm } from "../forms"

const OrganizationJoinRequestButton = () => {

  return (
    <Dialog>
      <DialogTrigger>
        <Button>
          Inscribirse
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Solicitud ERRENTA.EUS</DialogTitle>
          <OrganizationJoinRequestForm />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export { OrganizationJoinRequestButton }