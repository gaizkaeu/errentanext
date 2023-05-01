import { CalculationManage, CalculationManageAttributes } from "./Calculator";

export interface Call {
  id: string;
  type: "call";
  attributes: CallAttributes
}

export interface CallManage {
  id: string;
  type: "call";
  attributes: CallManageAttributes
}

export interface CallAttributes {
  phone_number: string,
  call_time: string,
  organization_id: string,
}

export interface CallManageAttributes extends CallAttributes {
  first_name: string,
  last_name: string,
  phone_number: string,
  calculation_id?:string,
  calculation?: CalculationManage,
  created_at: string,
  call_time: string,
  successful: boolean,
}