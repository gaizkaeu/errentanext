import { IndexTaxIncomes } from "@/components/tax_incomes/dashboard";
import { SideNav } from "@/components/ui/side-nav";


export default function TaxIncomes() {

  const links = [
  {
    title: "Declaraciones",
    links: [
      {
        text: "En curso",
        href: `/tax_incomes`,
      },
      {
        text: "Pasadas",
        href: `/tax_incomes?status=finished`,
      },
    ]
  },
  {
    title: "Citas",
    links: [
      {
        text: "Próximas",
        href: `/appointments`
      },
    ]
  }
]

  return (
    <div className="rounded-md bg-white transition-all dark:bg-slate-900">
      <h1 className="text-4xl font-bold leading-tight tracking-tighter md:text-5xl lg:text-6xl lg:leading-[1.1]">
        Mis <span className='font-light'>declaraciones</span>.
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-4 xl:grid-cols-5">
        <SideNav sections={links} />
        
        <div className="col-span-3 md:border-l border-l-slate-200 dark:border-l-slate-700 xl:col-span-4 p-3">
          <IndexTaxIncomes />
        </div>
      </div>
    </div>
  )
}
