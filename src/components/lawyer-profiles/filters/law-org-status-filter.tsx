import { MultipleSelectFilter } from "@/components/filters/multiple-select-filter";
import { OrgStatuses } from "@/store/types/LawyerProfile";

export const LawOrgStatusFilter = () => {
  return (
    <MultipleSelectFilter
      keys={OrgStatuses.map((d) => ({
        label: d,
        value: d,
      }))}
      title={"org_status"}
      key_name={"org_status"}
    />
  );
};
