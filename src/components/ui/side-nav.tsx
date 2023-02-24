import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { NavLink } from "@/components/ui/nav-link";
import { cn } from "@/lib/utils";

interface Section {
  title: string,
  links: Link[]
}

type Link = {
  href: string,
  text: string
}

const SideNav = (props: { sections: Section[] }) => {

  return (
    <>
      <SideNavMobile {...props} />
      <SideNavBig {...props} />
    </>
  )
}

const SideNavMobile = (props: { sections: Section[] }) => {
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
        {props.sections.map((item, index) => (
          <DropdownMenuGroup key={index}>
            <DropdownMenuSeparator
              className={cn({
                hidden: index === 0,
              })}
            />
            <DropdownMenuLabel>{item.title}</DropdownMenuLabel>
            <DropdownMenuSeparator className="-mx-2" />
            {item.links.map((item, index) => (
              <DropdownMenuItem key={index} asChild>
                <NavLink href={item.href} text={item.text} />
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
};

const SideNavBig = (props: { sections: Section[] }) => {
  return (
    <aside className="pb-12 max-md:hidden">
      <div className="space-y-4">
        <div className="px-6 py-2">
          {props.sections.map((item, index) => (
            <div className="px-6 py-2" key={index}>
              <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
                {item.title}
              </h2>
              <div className="grid grid-cols-1 gap-2">
                {item.links.map((item, index) => (
                  <NavLink href={item.href} text={item.text} key={index} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  )
};

export { SideNav }