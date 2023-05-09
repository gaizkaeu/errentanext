"use client"

import { CalculationManage, CalculationManageAttributes } from "@/store/types/Calculator"
import { ColumnDef } from "@tanstack/react-table"


export const columns: ColumnDef<CalculationManageAttributes>[] = [
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
  }
]
