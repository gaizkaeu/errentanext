import { MainNav } from "./main-nav"
import { MobileNav } from "./mobile-nav"
import { ModeToggle } from "./mode-toggle"
import { AuthenticationStatusNav } from "../authentication/actions/authentication-status-nav"

const SiteHeader = () => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-b-slate-200 bg-white dark:border-b-slate-700 dark:bg-slate-900">
    <div className="flex h-16 items-center mx-4">
      <MainNav />
      <MobileNav />
      <div className="flex flex-1 items-center justify-between space-x-2 sm:space-x-4 md:justify-end">
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