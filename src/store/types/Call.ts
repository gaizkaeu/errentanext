export interface Call {
  id: string;
  type: "call";
  attributes: CallAttributes
}

export interface CallAttributes {
  phone_number: string,
  call_time: string,
  organization_id: string,
}
