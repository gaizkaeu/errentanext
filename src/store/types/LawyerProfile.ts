import { BaseRelation, ClientRelation } from ".";
import { OrganizationRelation } from "./Organization";

export interface LawyerProfile {
  type: "lawyer_profile";
  id: string;
  attributes: LawyerProfileAttributes;
  relationships: {
    user: BaseRelation<ClientRelation>;
    organization: BaseRelation<OrganizationRelation>;
  };
}

export interface LawyerProfileAttributes {
  first_name: string;
  last_name: string;
  org_status?: OrgStatus;
  lawyer_status: LawyerStatus;
}

export const OrgStatuses = ["accepted", "pending"] as const;
export const LawyerStatuses = ["on_duty", "off_duty", "deleted"] as const;

export type OrgStatus = (typeof OrgStatuses)[number];
export type LawyerStatus = (typeof LawyerStatuses)[number];
