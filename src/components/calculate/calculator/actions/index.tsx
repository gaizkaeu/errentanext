"use client";
import { useTrainCalculatorManageMutation } from "@/store/endpoints/calculations"
import { useGetOrganizationCalculatorsCalculationsQuery } from "@/store/endpoints/organizations"
import { CalculatorManage } from "@/store/types/Calculator"
import { columns } from "../../calculation/table/columns"
import { DataTable } from "../../calculation/table/data-table"
import { Button } from "@/components/ui/button"
import { PlayIcon } from "@heroicons/react/24/outline"
import { useSearch } from "@/lib/utils"
import { SearchBar } from "@/components/filters"
import { MultipleSelectFilter } from "@/components/filters/multiple-select-filter"

export const TrainButton = ({ calculator }: { calculator: CalculatorManage }) => {
  const [mutation, { isLoading }] = useTrainCalculatorManageMutation()

  return (
    <Button disabled={isLoading} onClick={() => mutation({ calculator_id: calculator.id, org_id: calculator.attributes.organization_id })} variant="outline" className="flex items-center gap-2">
      <PlayIcon className="h-4 w-4" />
      <span>Entrenar</span>
    </Button>
  )
}

export const Data = ({ calculator }: { calculator: CalculatorManage }) => {

  const [s, setS] = useSearch(false, { 'q[train_with_in]': ['true'] }); 

  const { data } = useGetOrganizationCalculatorsCalculationsQuery({
    id: calculator.attributes.organization_id, calcr_id: calculator.id, filters: s
  }, {
    pollingInterval: 10000,
  })

  return (
    <div>
      {data && (
        <DataTable columns={columns} data={data.map((d) => d.attributes)}>
          <SearchBar searchParams={s} setSearchParams={setS}>
            <MultipleSelectFilter key_name="q[train_with_in]" title="Entrenamiento" keys={[{label: 'Si', value: 'true'}, {label: 'No', value: 'false'}]} />
          </SearchBar>
        </DataTable>
      )}
    </div>
  )

}