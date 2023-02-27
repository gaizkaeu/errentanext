
import { OrganizationManageLawyers } from "@/components/organizations";

export default function Page({ params }: { params: { id: string } }) {

  return (
    <div className="w-full">
      <OrganizationManageLawyers org_id={params.id} />
    </div>
  );
}