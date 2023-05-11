"use client"

import { Button } from "@/components/ui/button"
import { PencilIcon } from "@heroicons/react/24/outline"
import { Table } from "@tanstack/react-table"
import { Trash } from "lucide-react"
interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
 
  const disabled = table.getFilteredSelectedRowModel().rows.length === 0

  return (
    <div className="flex items-center bg-slate-50 dark:bg-midnight-700 rounded-lg px-2">
      <Button variant="ghost" size="sm" className="" disabled={disabled}>
        <Trash className="h-5 w-5 text-muted-foreground/70" />
      </Button>
      <Button variant="ghost" size="sm" className="" disabled={disabled}>
        <PencilIcon className="h-5 w-5 text-muted-foreground/70" />
      </Button>
    </div>
  )
}