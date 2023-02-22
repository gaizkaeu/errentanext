"use client";
import { TaxIncome } from "@/store/types/TaxIncome";
import { Link, useTranslations } from "next-intl";
import { Separator } from "../ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const TaxIncomeCard = (props: {tax: TaxIncome}) => {
  const t = useTranslations()

  return (
    <Link href={`/tax_incomes/${props.tax.id}`}>
      <div className="transition-all space-y-3 w-full bg-slate-50  dark:bg-slate-700 rounded-lg p-3 hover:rounded-xl hover:-translate-y-1 hover:shadow">
        <div className="flex">
          <div className="text-xl font-bold">
            {t(`taxincome.statuses.${props.tax.attributes.state}`)}
          </div>
        </div>
        <div>
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p>Carolina</p>
          </div>
        </div>
        <Separator />
        <div>
          <p className="text-sm font-light">Última actualizacion {props.tax.attributes.updated_at}</p>
        </div>
      </div>
    </Link>
  )

}

export { TaxIncomeCard }