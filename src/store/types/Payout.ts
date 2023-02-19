export interface Payout {
  type: "payout";
  id: string;
  attributes: PayoutAttributes;
}

export interface PayoutAttributes {
  amount: number;
  date: string;
  status: "pending" | "paid" | "failed";
  organization_id: string;
  metadata: any;
  created_at: string;
}
