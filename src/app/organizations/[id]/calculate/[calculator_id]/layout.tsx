import { CalculateComponent, InputComponent, SelectUniqueComponent } from "@/components/calculate";
import { Calculator } from "@/store/types/Calculator";
import { Organization } from "@/store/types/Organization";
import Link from "next/link";

const getOrg = async (id: string) => {
  const res = await fetch(process.env.NEXT_PUBLIC_API_BASE + "/api/v1/organizations/" + id, { next: { revalidate: 60 } });
  const data = await res.json();
  return data.data;
};

const getCalculator = async (id: string, calculator_id: string) => {
  const res = await fetch(process.env.NEXT_PUBLIC_API_BASE + "/api/v1/organizations/" + id + "/calculators/" + calculator_id, { next: { revalidate: 60 } });
  const data = await res.json();
  return data.data;
};

export default async function Page({ params, children }: { params: { id: string, calculator_id: string }, children: React.ReactNode }) {
  const orgProm: Promise<Organization> = getOrg(params.id);
  const calculatorProm: Promise<Calculator> = getCalculator(params.id, params.calculator_id);

  const [org, calculator] = await Promise.all([orgProm, calculatorProm]);

  return org && (
    <>
      <div className="w-full md:p-4 p-1">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-5xl lg:text-6xl lg:leading-[1.1]">
              {org.attributes.name}
            </h1>
            <h2 className="text-xl font-bold leading-tight tracking-tighter md:text-3xl lg:text-4xl lg:leading-[1.1]">
              Asesoría en <span className="font-light">{org.attributes.city}</span>.{" "}
            </h2>
          </div>
        </div>
        <br />
        <CalculateComponent calculator={calculator} org_id={params.id}>
          {children}
        </CalculateComponent>
      </div>
    </>
  );
}
