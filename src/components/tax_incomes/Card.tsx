"use client";
import { TaxIncome } from "@/store/types/TaxIncome";
import { useTranslations } from "next-intl";

const TaxIncomeCard = (props: {tax: TaxIncome}) => {
  const t = useTranslations()

  return (
    <div className="w-full bg-slate-50 rounded-lg p-3">
      <div className="flex">
        <div className="text-xl font-bold">
          {t(`taxincome.statuses.${props.tax.attributes.state}`)}
        </div>
      </div>
    </div>
  )

}

export { TaxIncomeCard }