import { BaseRelation, ClientRelation, EstimationRelation, LawyerRelation } from ".";
import { AppointmentRelation } from "./Appointment";

export const TaxIncomeStatuses = [
  "pending_assignation",
  "payment",
  "meeting",
  "rejected",
  "documentation",
  "in_progress",
  "finished",
] as const;

export const TaxIncomeSearchKeys = ["name", "creation_date"] as const;

export type TaxIncomeStatus = (typeof TaxIncomeStatuses)[number];
export type TaxIncomeSearch = (typeof TaxIncomeSearchKeys)[number];

export interface TaxIncomeData {
  year: number;
  lawyer_id: string;
  price: number;
  client_id: string;
  organization_id: string;
  observations: string;
  estimation: {
    token: string;
  };
}

export interface TaxIncomeRelations {
  client: BaseRelation<ClientRelation>;
  lawyer: BaseRelation<LawyerRelation>;
  appointment: BaseRelation<AppointmentRelation>;
  estimation: BaseRelation<EstimationRelation>;
}

export interface TaxIncome {
  id: string;
  type: "tax_income";
  attributes: TaxIncomeAttributes;
  relationships: TaxIncomeRelations;
}

export interface TaxIncomeAttributes {
  created_at: string;
  updated_at: string;
  price: number;
  state: TaxIncomeStatus;
  year?: number;
  captured: boolean;
  captured_amount: number;
  paid: boolean;
  client: {
    first_name: string;
    last_name: string;
    id: string;
  };
}

export interface TaxIncomeRelation {
  type: "tax_income";
  id: string;
}
