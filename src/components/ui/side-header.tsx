import { MainNav } from "./main-nav"
import { MobileNav } from "./mobile-nav"
import { ModeToggle } from "./mode-toggle"
import { AuthenticationStatusNav } from "../authentication/actions/authentication-status-nav"

const SiteHeader = () => {
  return (
    <header className="sticky top-0 z-40 w-full bg-white dark:bg-black">
    <div className="flex h-16 items-center mx-4">
      <div className="flex-1">
      <MainNav />
      <MobileNav />
      </div>
      <div className="flex flex-1 items-center space-x-2 sm:space-x-4 justify-end">
        <nav className="flex items-center space-x-1">
          <AuthenticationStatusNav />
          <ModeToggle />
        </nav>
      </div>
    </div>
  </header>
  )
}

export { SiteHeader }