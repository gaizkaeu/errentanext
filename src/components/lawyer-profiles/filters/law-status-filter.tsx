import { MultipleSelectFilter } from "@/components/filters/multiple-select-filter";
import { LawyerStatuses } from "@/store/types/LawyerProfile";

export const LawyerStatusFilter = () => {
  return (
    <MultipleSelectFilter
      keys={LawyerStatuses.map((d) => ({
        label: d,
        value: d,
      }))}
      title={"lawyer_status"}
      key_name={"lawyer_status"}
    />
  );
};
