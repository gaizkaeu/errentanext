import { OrganizationCreateButton } from "@/components/organizations";
import { OrganizationManageList } from "@/components/organizations/manage";

export default function OrganizationManageIndex() {

  return (
    <div className="flex px-4 mx-auto w-full sm:px-6 lg:px-8 mt-8 md:mt-12">
      <div className="mx-auto space-y-2">
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-bold leading-tight tracking-tighter md:text-5xl lg:text-6xl lg:leading-[1.1]">
            Administrar
          </h2>
          <h3 className="text-2xl font-light leading-tight tracking-tighter md:text-5xl lg:text-6xl lg:leading-[1.1]">
            Asesorías.
          </h3>
        </div>
        <div className="space-y-3">
          <OrganizationCreateButton />
          <OrganizationManageList />
        </div>
      </div>
    </div>
  )
}
