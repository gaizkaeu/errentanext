
import { OrganizationManageTransactions } from "@/components/organizations";

export default function Page({ params }: { params: { id: string } }) {

  return (
    <div className="w-full">
      <OrganizationManageTransactions org_id={params.id} />
    </div>
  );
}