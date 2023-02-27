import { Transaction } from "@/store/types/Transaction";

export const TrnStatusBadge = (props: { trn: Transaction }) => {

  const status = props.trn.attributes.status;

  switch (status) {
    case "succeeded":
      return (
        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
          {status}
        </span>
      )
    case "refunded":
      return (
        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
          {status}
        </span>
      )
    case "requires_capture":
      return (
        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
          {status}
        </span>
      )
  }
}