import { CalculateComponent } from "@/components/calculate";
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
      <div className="flex flex-col md:p-4 p-1 h-full max-w-xl space-y-2 mx-auto">
        <div className="bg-slate-100 rounded-lg p-2 dark:bg-midnight-700 md:h-4/6">
          <CalculateComponent calculator={calculator} org_id={params.id}>
            {children}
          </CalculateComponent>
        </div>
        <div className="from-fuchsia-600 to-pink-600 text-white bg-gradient-to-r rounded-lg p-3 max-md:w-full">
          <h2 className="text-2xl font-bold"><span className="font-light">Calculando</span> {calculator.attributes.topic_name}</h2>
          <OrgViewExplore org={org} />
        </div>
        <div className="w-full p-3 rounded-lg dark:bg-midnight-700 bg-slate-100 mt-2">
          <h4 className="text-2xl font-bold">Como protegemos <span className="font-light">tus datos</span>.</h4>
        </div>
      </div>
    </>
  );
}
