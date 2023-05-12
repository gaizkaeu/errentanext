export interface BaseQueryResponseList<T> {
  data: T[];
  meta: Pagination;
}

export interface Pagination {
  count?: number;
  page: number;
  items: number;
  pages?: number;
  last?: number;
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