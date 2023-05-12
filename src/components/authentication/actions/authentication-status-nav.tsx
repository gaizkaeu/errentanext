"use client";

import { useAuth } from "@/components/providers/authProvider";
import { Button, buttonVariants } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { AdjustmentsHorizontalIcon, ArrowLeftCircleIcon } from "@heroicons/react/24/outline";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { ChevronsUpDown, User } from "lucide-react";
import Link from "next/link";

const AuthenticationStatusNav = () => {

  const { isAuthenticated, currentUser, logout } = useAuth();

  return isAuthenticated ? (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          role="combobox"
          aria-label="Select a team"
          className="w-[200px] justify-between"
        >
          <Avatar className="mr-2 h-5 w-5 rounded-lg">
            <AvatarImage
              className="rounded-full"
              src={`https://avatar.vercel.sh/${currentUser?.attributes.first_name}.png`}
              alt={currentUser?.attributes.first_name}
            />
            <AvatarFallback>SC</AvatarFallback>
          </Avatar>
          {currentUser?.attributes.first_name} {currentUser?.attributes.last_name}
          <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuGroup>
          <Link href="/organization-manage">
            <DropdownMenuItem>
              <AdjustmentsHorizontalIcon className="mr-2 h-4 w-4" />
              <span>Mis asesorías</span>
              <DropdownMenuShortcut>⇧⌘A</DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuGroup>
            <DropdownMenuItem>
              <ArrowLeftCircleIcon className="mr-2 h-4 w-4" />
              <span>Cerrar sesión</span>
              <DropdownMenuShortcut>⇧⌘O</DropdownMenuShortcut>
            </DropdownMenuItem>
        </DropdownMenuGroup>
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