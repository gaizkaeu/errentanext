"use client"
import { ArrowLeftIcon } from "@heroicons/react/24/outline"
import { Button } from "./button"
import Link from "next/link"

export const BackButton = (props: { href: string }) => {

  return (
    <Link href={props.href}>
      <Button size="sm">
        <ArrowLeftIcon className="h-4 w-4" aria-hidden="true" />
        <span className="sr-only">Back</span>
      </Button>
    </Link>
  )
}


