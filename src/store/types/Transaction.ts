export interface Transaction {
  type: "transaction";
  id: string;
  attributes: TransactionAttributes;
}

export const TransactionStatuses = [
  "succeeded",
  "requires_capture",
  "refunded",
] as const;


export type TransactionStatus = (typeof TransactionStatuses)[number];

export interface TransactionAttributes {
  amount: number;
  amount_capturable: number;
  status: TransactionStatus;
  payment_intent_id: string;
  user_id: string;
  organization_id: string;
  created_at: string;
}
