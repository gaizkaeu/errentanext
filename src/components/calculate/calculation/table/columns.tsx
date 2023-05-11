"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { CalculationManage, CalculationManageAttributes } from "@/store/types/Calculator"
import { ColumnDef } from "@tanstack/react-table"
import { DataTableRowActions } from "./data-table-row-actions"


export const columns: ColumnDef<CalculationManage>[] = [
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
    accessorFn: (row) => row.id,
    header: "id",
  },
  {
    accessorFn: (row) => row.attributes.organization_id,
    header: "organization_id",
  },
  {
    accessorFn: (row) => row.attributes.calculator_id,
    header: "calculator_id",
  },
  {
    cell: ({ row }) => (
      <span>
        {row.original.attributes.output.classification}
        {row.original.attributes.train_with && (
          <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            TRAIN-DATA
          </span>
        )}
        {!row.original.attributes.eligible_for_training && (
          <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            INVALID
          </span>
        )}
      </span>
    ),
    header: "Classification",
  },
  {
    cell: ({row}) => <span>{row.original.attributes.price_result} €</span>,
    header: "Price",
  },
  {
    accessorFn: (row) => row.attributes.created_at,
    header: "Fecha de creación",
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]
