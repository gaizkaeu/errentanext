import { CalculationComponent } from "@/components/calculate";

export default async function Page({ params }: { params: { id: string } }) {

  return (
    <>
      <div className="w-full md:p-4 p-1">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-5xl lg:text-6xl lg:leading-[1.1]">
              Mi estimación
            </h1>
          </div>
        </div>
        <br />
        <CalculationComponent calculation_id={params.id} />
      </div>
    </>
  );
}