import { Transaction } from "@/store/types/Transaction";
import { TrnStatusBadge } from "./trn-status-badge";
import { Button } from "../ui/button";

export const TransactionTable = (props: { transactions: Transaction[] }) => {

  return (
    <div className="relative overflow-x-auto sm:rounded-lg">
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" className="px-6 py-3">
            ID
          </th>
          <th scope="col" className="px-6 py-3">
            STATUS
          </th>
          <th scope="col" className="px-6 py-3">
            AMOUNT
          </th>
          <th scope="col" className="px-6 py-3">
            ACTION
          </th>
        </tr>
      </thead>
      <tbody>
        { props.transactions.map((trn, index) => (
        <tr key={index }className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
          <th scope="row" className="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
            <div className="text-base font-semibold">{trn.id}</div>
          </th>
          <td className="px-6 py-4">
            <TrnStatusBadge trn={trn} />
          </td>
          <td className="px-6 py-4">
            { trn.attributes.status == "requires_capture" ? (
              trn.attributes.amount_capturable / 100 + "€"
            ) : (
              trn.attributes.amount / 100 + "€"
            )}
          </td>
          <td className="px-6 py-4">
            <Button variant="ghost">
              Detalles
            </Button>
          </td>
        </tr>
        ))}
      </tbody>
    </table>
  </div>
  )

}