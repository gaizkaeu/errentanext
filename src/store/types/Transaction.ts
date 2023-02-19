export interface Transaction {
  type: "transaction";
  id: string;
  attributes: TransactionAttributes;
}

export interface TransactionAttributes {
  amount: number;
  amount_capturable: number;
  status: "succeeded" | "requires_capture" | "refunded";
  payment_intent_id: string;
  user_id: string;
  organization_id: string;
  created_at: string;
}
