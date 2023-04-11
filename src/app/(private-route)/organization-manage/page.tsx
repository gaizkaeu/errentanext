import { OrganizationJoinComponent } from "@/components/organizations";
import { OrganizationManageList } from "@/components/organizations/manage";

export default function OrganizationManageIndex() {

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <h2 className="text-2xl font-bold leading-tight tracking-tighter md:text-5xl lg:text-6xl lg:leading-[1.1]">
          Administrar
        </h2>
        <h3 className="text-2xl font-light leading-tight tracking-tighter md:text-5xl lg:text-6xl lg:leading-[1.1]">
          Asesorías.
        </h3>
      </div>
      <div className="grid lg:grid-cols-7 grid-cols-1 gap-3 max-w-7xl mx-auto">
        <div className="lg:col-span-3">
          <OrganizationJoinComponent />
        </div>
        <div className="lg:col-span-4">
          <OrganizationManageList />
        </div>
      </div>
    </div>
  )
}
