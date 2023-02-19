"use client"

import * as React from "react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ScrollArea } from "@/components/ui/scroll-area"

export function MobileNav() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="-ml-4 text-base hover:bg-transparent focus:ring-0 focus:ring-offset-0 md:hidden"
        >
          <span className="font-bold">Menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
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
}