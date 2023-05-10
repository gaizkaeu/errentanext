"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { CalculationManageAttributes } from "@/store/types/Calculator"
import { ColumnDef } from "@tanstack/react-table"
import { DataTableRowActions } from "./data-table-row-actions"


export const columns: ColumnDef<CalculationManageAttributes>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorFn: (row) => row.output.classification,
    header: "Classification",
  },
  {
    accessorKey: "price_result",
    header: "Price",
  },
  {
    accessorKey: "train_with",
    header: "Entrenamiento",
  },
  {
    accessorKey: "eligible_for_training",
    header: "Elegible para entrenamiento",
  },
  {
    accessorKey: "created_at",
    header: "Fecha de creación",
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]
