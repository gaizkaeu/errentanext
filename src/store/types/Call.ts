export interface Call {
  id: string;
  type: "appointment";
  attributes: CallAttributes
}

export interface CallAttributes {
  phone_number: string,
  call_at: string,
  interest_in: string,
  message?: string,
}
