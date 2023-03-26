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
  on_duty: boolean;
  phone: string;
  email: string;
  skill_list: string[];
  avatar_url?: string;
}