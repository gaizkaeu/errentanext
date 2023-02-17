import { OrganizationExplore } from "@/components/organizations/explore";
export default function Organizations() {

  return (
    <div className="flex px-4 mx-auto w-full sm:px-6 lg:px-8 mt-8 md:mt-12">
      <div className="mx-auto space-y-2">
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-bold leading-tight tracking-tighter md:text-5xl lg:text-6xl lg:leading-[1.1]">
            Explorar
          </h2>
          <h3 className="text-2xl font-light leading-tight tracking-tighter md:text-5xl lg:text-6xl lg:leading-[1.1]">
            Asesorías.
          </h3>
        </div>
        <OrganizationExplore />
      </div>
    </div>
  )
}
