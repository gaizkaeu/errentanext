import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { NavLink } from "@/components/ui/nav-link";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Link } from "next-intl";

const SideNav = ({ id }: {id: string}) => {
  return (
    <>
      <SideNavMobile id={id} />
      <SideNavBig id={id} />
    </>
  )
}

const SideNavMobile = ({id} : {id: string}) => {
  return (
    <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button
        className="md:hidden"
      >
        <span className="font-bold">Menu</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent
      sideOffset={24}
      alignOffset={4}
      className="w-[300px] overflow-scroll"
    >
      <DropdownMenuItem asChild>
        <Link href="/" className="flex items-center">
          asd
        </Link>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <ScrollArea className="h-[400px]">
      </ScrollArea>
    </DropdownMenuContent>
  </DropdownMenu>
  )
};
const SideNavBig = ({id}: {id: string}) => {

  return (
    <aside className="pb-12 max-md:hidden">
      <div className="space-y-4">
        <div className="px-6 py-2">
          <div className="space-y-1">
            <NavLink href={`/tax_incomes/${id}/lawyer`} text={"Abogado"} />
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start"
            >
              Cita
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start"
            >
              Pago
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start"
            >
              Documentación
            </Button>
          </div>
        </div>
        <div className="px-6 py-2">
          <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
            Ajustes
          </h2>
          <div className="space-y-1">
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start"
            >
              Notificaciones
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start"
            >
              Seguridad
            </Button>
          </div>
        </div>
      </div>
    </aside>
  )
};

export { SideNav }