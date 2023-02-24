"use client";
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTrigger } from "@/components/ui/dialog"
import { OrganizationCreateForm } from "../forms"

const OrganizationCreateButton = () => {

  return (
    <Dialog>
      <DialogTrigger>
        <Button>
          Create Organization
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogDescription>
            <OrganizationCreateForm />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export { OrganizationCreateButton }