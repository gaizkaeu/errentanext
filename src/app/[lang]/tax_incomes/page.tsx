import { IndexTaxIncomes } from "@/components/tax_incomes";


export default function TaxIncomes() {

  return (
    <div className="mt-3">
      <h1 className="text-4xl font-bold leading-tight tracking-tighter md:text-5xl lg:text-6xl lg:leading-[1.1]">
        Mis <span className='font-light'>declaraciones</span>.
      </h1>
      <br/>
      <IndexTaxIncomes />
    </div>
  )
}
