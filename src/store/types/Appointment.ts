import { BaseRelation, ClientRelation, LawyerRelation } from ".";
import { TaxIncomeRelation } from "./TaxIncome";

export interface AppointmentRelation {
  type: "appointment";
  id: string;
}

export interface Appointment {
  id: string;
  type: "appointment";
  attributes: {
    phone: string;
    time: string;
    meeting_method: "office" | "phone";
  };
  relationships: {
    lawyer: BaseRelation<LawyerRelation>;
    client: BaseRelation<ClientRelation>;
    tax_income: BaseRelation<TaxIncomeRelation>;
  };
}

export interface AppointmentFilters {
  client_id?: string;
  lawyer_id?: string;
  day?: string;
  date_range?: {
    start_date: string;
    end_date: string;
  };
}
