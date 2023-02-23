import { Organization } from "@/store/types/Organization";

export const OrganizationTitle = (props: { org: Organization }) => {

  return (
    <div>
      <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-5xl lg:text-6xl lg:leading-[1.1]">
        {props.org.attributes.name}
      </h1>
      <h2 className="text-xl font-bold leading-tight tracking-tighter md:text-3xl lg:text-4xl lg:leading-[1.1]">
        Asesoría en <span className="font-light">{props.org.attributes.city}</span>
      </h2>
    </div>
  )
}