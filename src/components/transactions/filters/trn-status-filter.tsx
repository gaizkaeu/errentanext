import { MultipleSelectFilter } from "@/components/filters/multiple-select-filter";
import { TransactionStatuses } from "@/store/types/Transaction";

export const TransactionStatusFilter = () => {
  return (
    <MultipleSelectFilter
      keys={TransactionStatuses.map((d) => ({
        label: d,
        value: d,
      }))}
      title={"transaction_status"}
      key_name={"transaction_status"}
    />
  );
};
