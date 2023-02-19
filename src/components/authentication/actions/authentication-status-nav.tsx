"use client";

import { useAuth } from "@/components/providers/authProvider";
import { Button, buttonVariants } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/outline";
import { Link } from "next-intl";

const AuthenticationStatusNav = () => {

  const { isAuthenticated, logout } = useAuth();

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
        <div
          className={
            buttonVariants({
              size: "sm",
              variant: "ghost",
              className: "text-slate-700 dark:text-slate-400",
            })
          }
        >
          Sign in
          <span className="sr-only">Sign in</span>
        </div >
      </Link >
    </>
  )

}

export {AuthenticationStatusNav};