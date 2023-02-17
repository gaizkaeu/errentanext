"use client"
import { ArrowLeftIcon } from "@heroicons/react/24/outline"
import { Button } from "./button"
import { useRouter } from "next/navigation";

export const BackButton = () => {

  const router = useRouter();

  return (
    <Button onClick={() => router.back()} size="sm">
      <ArrowLeftIcon className="h-4 w-4" aria-hidden="true" />
      <span className="sr-only">Back</span>
    </Button>
  )
}


