import { CalculateComponent } from "@/components/calculate";
import ContactSignInComponent from "@/components/contact/forms";
import { OrgViewExplore } from "@/components/organizations";
import { Calculator } from "@/store/types/Calculator";
import { Organization } from "@/store/types/Organization";

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
      <div className="flex flex-col md:p-4 p-1 h-full max-w-2xl space-y-2 mx-auto">
        <h2 className="text-2xl font-bold leading-tight tracking-tighter md:text-5xl lg:text-6xl lg:leading-[1.1]">
          Calculando
        </h2>
        <h3 className="text-2xl font-light leading-tight tracking-tighter md:text-5xl lg:text-6xl lg:leading-[1.1]">
          {calculator.attributes.topic_name}.
        </h3>
        <div className="rounded-lg p-2 md:h-4/6">
          <ContactSignInComponent org={org}>
            <CalculateComponent calculator={calculator} org_id={params.id}>
              {children}
            </CalculateComponent>
          </ContactSignInComponent>
        </div>
      </div>
    </>
  );
}
