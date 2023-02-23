"use client";

import { useAuth } from "@/components/providers/authProvider";
import { Button, buttonVariants } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/outline";
import { Link } from "next-intl";

const AuthenticationStatusNav = () => {

  const { isAuthenticated, currentUser, logout } = useAuth();

  return isAuthenticated ? (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="sm"
        >
          <span className="font-bold">My account</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        sideOffset={24}
        alignOffset={4}
      >
        <DropdownMenuItem>
          <Link href="/dashboard">
            <span>Mi cuenta</span>
          </Link>
        </DropdownMenuItem>
        {currentUser?.attributes.account_type == "org_manage" && (
            <DropdownMenuItem>
              <Link href="/organization-manage">
                <span>Administrar Asesorías</span>
              </Link>
            </DropdownMenuItem>
          )}
        <DropdownMenuItem onClick={logout}>
          <ArrowLeftOnRectangleIcon className="mr-2 h-4 w-4" />
          <span>Log out</span>
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