import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { NavLink } from "@/components/ui/nav-link";

const SideNav = (props: {id: string}) => {
  return (
    <>
      <SideNavMobile {...props} />
      <SideNavBig {...props} />
    </>
  )
}

const SideNavMobile = (props: {id: string}) => {
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
        <NavLink href={`/organization-manage/${props.id}/general`} text={"General"} />
      </DropdownMenuItem>
      <DropdownMenuItem asChild>
        <NavLink href={`/organization-manage/${props.id}/lawyers`} text={"Abogados"} />
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
  )
};
const SideNavBig = (props: {id: string}) => {
  return (
    <aside className="pb-12 max-md:hidden">
      <div className="space-y-4">
        <div className="px-6 py-2">
          <div className="space-y-1">
            <NavLink href={`/organization-manage/${props.id}/general`} text={"General"} />
            <NavLink href={`/organization-manage/${props.id}/lawyers`} text={"Abogados"} />
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start"
            >
              Declaraciones
            </Button>
          </div>
        </div>
        <div className="px-6 py-2">
          <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
            Balances
          </h2>
          <div className="space-y-1">
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start"
            >
              Transacciones
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start"
            >
              Payouts
            </Button>
          </div>
        </div>
        <div className="px-6 py-2">
          <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
            Estadísticas
          </h2>
          <div className="space-y-1">
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start"
            >
              Tendencias
            </Button>
          </div>
        </div>
      </div>
    </aside>
  )
};

export { SideNav }