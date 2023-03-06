"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Link } from "next-intl"
import { Bars3Icon } from "@heroicons/react/24/outline"

export function MobileNav() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="-ml-4 text-base hover:bg-transparent focus:ring-0 focus:ring-offset-0 md:hidden"
        >
          <Bars3Icon className="w-8 h-8" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        sideOffset={24}
        alignOffset={4}
        className="overflow-scroll"
      >
        <DropdownMenuItem asChild>
          <Link href="/" className="flex items-center">
            Home
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/organizations" className="flex items-center">
            Explorar asesorías
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/organizations/onboarding" className="flex items-center">
            Inscribir mi asesoría
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}