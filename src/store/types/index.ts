export interface BaseQueryResponseList<T> {
  data: T[];
}

export interface BaseQueryResponse<T> {
  data: T;
}

export interface BaseQueryResponseIncluded<T> {
  data: T;
}


export interface EstimationRelation {
  type: "estimation";
  id: string;
}

export interface BaseRelation<T> {
  data: T | null;
}

export interface ClientRelation {
  type: "user";
  id: string;
}

export interface LawyerRelation {
  type: "lawyer";
  id: string;
}