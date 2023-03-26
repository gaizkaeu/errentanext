"use client";

import { useAuth } from "@/components/providers/authProvider";
import { Button, buttonVariants } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { BuildingOfficeIcon, TagIcon, UserGroupIcon, UserIcon } from "@heroicons/react/24/outline";
import { Link } from "next-intl";

const AuthenticationStatusNav = () => {

  const { isAuthenticated, currentUser, logout } = useAuth();

  return isAuthenticated ? (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="sm"
          variant="subtle"
        >
          <span className="sr-only">My account</span>
          <UserIcon className="h-6 w-6" />
          <div className="ml-2">
            <p className="text-lg font-semibold">{currentUser?.attributes.first_name}</p>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="center"
        sideOffset={24}
        alignOffset={4}
      >
        <DropdownMenuItem>
          <p className="text-xl">{currentUser?.attributes.first_name} {currentUser?.attributes.last_name}</p>
        </DropdownMenuItem>
        <Link href="/dashboard">
          <DropdownMenuItem>
            <div className="flex items-center">
              <div className="w-10 h-10 flex rounded-full bg-slate-100 dark:bg-slate-900 text-center ">
                <UserGroupIcon className="m-auto h-8" />
              </div>
              <div className="flex-1 ml-2">
                <p className="text-lg font-semibold">Mi <span className="font-light">perfil</span>.</p>
              </div>
            </div>
          </DropdownMenuItem>
        </Link>
        <Link href="/organization-manage">
          <DropdownMenuItem>
            <div className="flex items-center">
              <div className="w-10 h-10 flex rounded-full bg-slate-100 dark:bg-slate-900 text-center ">
                <BuildingOfficeIcon className="m-auto h-8" />
              </div>
              <div className="flex-1 ml-2">
                <p className="text-lg font-semibold">Mis <span className="font-light">asesorías</span>.</p>
              </div>
            </div>
          </DropdownMenuItem>
        </Link>
        <Link href="/lawyer-profiles">
          <DropdownMenuItem>
            <div className="flex items-center">
              <div className="w-10 h-10 flex rounded-full bg-slate-100 dark:bg-slate-900 text-center ">
                <TagIcon className="m-auto h-8" />
              </div>
              <div className="flex-1 ml-2">
                <p className="text-lg font-semibold">Perfil de <span className="font-light">abogado</span>.</p>
              </div>
            </div>
          </DropdownMenuItem>
        </Link>
        <DropdownMenuItem onClick={logout}>
          <p className="text-lg font-semibold">Cerrar <span className="font-light">sesión</span>.</p>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    <>
      <Link
        href="/account/sign_in"
      >
        <Button
          className={
            buttonVariants({
              size: "sm",
              variant: "ghost",
              className: "text-slate-700 dark:text-slate-400",
            })
          }
        >
          Sign in
        </Button >
      </Link >
    </>
  )

}

export { AuthenticationStatusNav };