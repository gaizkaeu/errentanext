import { InputComponent, SelectUniqueComponent } from "@/components/calculate";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Calculator } from "@/store/types/Calculator";
import Link from "next/link";

const getCalculator = async (id: string, calculator_id: string) => {
  const res = await fetch(process.env.NEXT_PUBLIC_API_BASE + "/api/v1/organizations/" + id + "/calculators/" + calculator_id, { next: { revalidate: 60 } });
  const data = await res.json();
  return data.data;
};


export default async function Page({ params }: { params: { id: string, calculator_id: string, q_id: string } }) {
  const calculator: Calculator = await getCalculator(params.id, params.calculator_id);

  return calculator && (
    <>

      <Progress value={(parseInt(params.q_id) / calculator.attributes.questions.length) * 100} />

      <br />
      <div className="mx-auto flex flex-col max-w-xl">
        <h3 className="text-2xl font-bold">{calculator.attributes.questions[parseInt(params.q_id)].title}</h3>

        <br />

        <div className="mx-auto">
          {calculator.attributes.questions.map((question) => {
            switch (question.field_type) {
              case "input":
                return <InputComponent {...question} />
              case "select_unique":
                return <SelectUniqueComponent {...question} />
              default:
                return <></>
            }
          })[parseInt(params.q_id)]
          }
        </div>

        <br />

        {parseInt(params.q_id) === calculator.attributes.questions.length - 1 ? (
          <div className="flex gap-3">
            <Link href={`/organizations/${params.id}/calculate/${params.calculator_id}/${parseInt(params.q_id) - 1}`}>
              <Button >Anterior</Button>
            </Link>
            <Button type="submit">Enviar</Button>
          </div>
        ) : (
          <div className="flex gap-3">
            <Link href={`/organizations/${params.id}/calculate/${params.calculator_id}/${parseInt(params.q_id) - 1}`}>
              <Button >Anterior</Button>
            </Link>
            <Link href={`/organizations/${params.id}/calculate/${params.calculator_id}/${parseInt(params.q_id) + 1}`}>
              <Button>Siguiente</Button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
