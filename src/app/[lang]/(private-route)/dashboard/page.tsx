import { DashGridActions } from "@/components/dashboard/actions";

export default function Example() {
  return (
    <div className="mt-3">
      <h1 className="text-4xl font-bold leading-tight tracking-tighter md:text-5xl lg:text-6xl lg:leading-[1.1]">
        Mi <span className='font-light'>cuenta</span>.
      </h1>
      <br/>
      <DashGridActions />
    </div>
  )
}
