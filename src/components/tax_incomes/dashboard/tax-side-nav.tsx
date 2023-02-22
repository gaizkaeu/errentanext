import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Link } from "next-intl";

const SideNav = () => {
  return (
    <>
      <SideNavMobile />
      <SideNavBig />
    </>
  )
}

const SideNavMobile = () => {
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
const SideNavBig = () => {
  return (
    <aside className="pb-12 max-md:hidden">
      <div className="space-y-4">
        <div className="px-6 py-2">
          <div className="space-y-1">
            <Button
              variant="subtle"
              size="sm"
              className="w-full justify-start"
            >
              En curso
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start"
            >
              Finalizadas
            </Button>
          </div>
        </div>
        <div className="px-6 py-2">
          <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
            Citas
          </h2>
          <div className="space-y-1">
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start"
            >
              Próximas
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start"
            >
              Pasadas
            </Button>
          </div>
        </div>
      </div>
    </aside>
  )
};

export { SideNav }