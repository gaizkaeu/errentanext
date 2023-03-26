import { LawyerProfileManage } from "@/components/lawyer-profiles";

export default function OrganizationManageIndex() {

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <h3 className="text-2xl font-bold leading-tight tracking-tighter md:text-5xl lg:text-6xl lg:leading-[1.1]">
          Mi perfil de
        </h3>
        <h2 className="text-2xl font-light leading-tight tracking-tighter md:text-5xl lg:text-6xl lg:leading-[1.1]">
          Abogado.
        </h2>
      </div>
      <LawyerProfileManage />
    </div>
  )
}
