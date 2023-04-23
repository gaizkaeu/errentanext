import { round } from "lodash";
import { BaseRelation, ClientRelation, LawyerRelation } from ".";
import { Tag, VerifiedTag } from "./Tag";

export interface StripeSubscription {
  id: string;
  object: "subscription";
  application_fee_percent: number | null;
  billing: "charge_automatically" | "send_invoice";
  billing_cycle_anchor: number;
  billing_thresholds: any | null;
  cancel_at: number | null;
  cancel_at_period_end: boolean;
  canceled_at: number | null;
  collection_method: "charge_automatically" | "send_invoice";
  created: number;
  current_period_end: number;
  current_period_start: number;
  customer: string;
  discount: any | null;
  ended_at: number | null;
  items: {
    object: "list";
    data: Array<{
      id: string;
      object: "subscription_item";
      billing_thresholds: any | null;
      created: number;
      metadata: any;
      plan: {
        id: string;
        object: "plan";
        active: boolean;
        aggregate_usage: any | null;
        amount: number;
        billing_scheme: "per_unit" | "tiered";
        created: number;
        currency: string;
        interval: "day" | "week" | "month" | "year";
        interval_count: number;
        livemode: boolean;
        metadata: any;
        nickname: string | null;
        product: string;
        tiers: any | null;
        tiers_mode: any | null;
        transform_usage: any | null;
        trial_period_days: number | null;
        usage_type: "licensed" | "metered";
      };
      quantity: number;
      subscription: string;
    }>;
    has_more: boolean;
    total_count: number;
    url: string;
  };
  latest_invoice: string | null;
  livemode: boolean;
  metadata: any;
  next_pending_invoice_item_invoice: string | null;
  pending_invoice_item_interval: any | null;
  pending_setup_intent: string | null;
  plan: {
    id: string;
    object: "plan";
    active: boolean;
    aggregate_usage: any | null;
    amount: number;
    billing_scheme: "per_unit" | "tiered";
    created: number;
    currency: string;
    interval: "day" | "week" | "month" | "year";
    interval_count: number;
    livemode: boolean;
    metadata: any;
    nickname: string | null;
    product: string;
    tiers: any | null;
    tiers_mode: any | null;
    transform_usage: any | null;
    trial_period_days: number | null;
    usage_type: "licensed" | "metered";
  };
  quantity: number;
  start: number;
  status: "incomplete" | "incomplete_expired" | "trialing" | "active";
}

export interface OrganizationStats {
  id: string;
  type: "organization_stat";
  attributes: OrganizationStatsAttributes;
  characteristics: OrganizationStatsCharacteristics;
}

export interface OrganizationStatsCharacteristics {
  lawyer_active_percentage: number;
  lawyer_inactive_percentage: number;
}

export interface OrganizationStatsAttributes {
  lawyers_active_count: number;
  lawyers_active_count_acc: number;
  lawyers_inactive_count: number;
  lawyers_inactive_count_acc: number;
  tax_income_count: number;
  tax_income_count_acc: number;
  one_star_count: number;
  one_star_count_acc: number;
  two_star_count: number;
  two_star_count_acc: number;
  three_star_count: number;
  three_star_count_acc: number;
  four_star_count: number;
  four_star_count_acc: number;
  five_star_count: number;
  five_star_count_acc: number;
  balance_today: number;
  balance_capturable_today: number;
  date: string;
}

export interface OrganizationRelation {
  type: "organization";
  id: string;
}

export interface OrganizationAttributes {
  name: string;
  description: string;
  phone: string;
  email: string;
  price_range: number;
  city: string;
  province: string;
  country: string;
  street: string;
  postal_code: string;
  latitude: number;
  longitude: number;
  prices: {
    home_changes: number;
  };
  status:
    | "not_subscribed"
    | "featured_city"
    | "featured_province"
    | "featured_country";
  ratings: OrganizationReviews;
  website: string;
  tax_income_count: number;
  app_fee?: number;
  distance?: number;
  subscription_id: string;
  logo_url: string;
  created_at: string;
  visible: boolean;
  open_close_hours: {
    monday: OpenClose;
    tuesday: OpenClose;
    wednesday: OpenClose;
    thursday: OpenClose;
    friday: OpenClose;
    saturday: OpenClose;
    sunday: OpenClose;
  }
  google_place_details?: {
    rating: number;
    reviews: GoogleReview[];
  }
  nearest_open_time: string;
  open: boolean;
  near_close: boolean;
  settings?: {
    hireable: boolean;
  }
  skill_list: string[];
  company_target_list: string[];
  service_list: string[];
  
}

export type OpenClose = {
  open: string;
  close: string;
}

export interface Organization {
  id: string;
  type: "organization";
  attributes: OrganizationAttributes;
  characteristics: OrganizationCharacteristics;
}

export interface OrganizationMembership {
  id: string;
  type: "organization_membership";
  attributes: OrganizationMembershipAttributes;
}

export interface OrganizationMembershipAttributes {
  role: OrganizationMembershipRole;
  created_at: string;
  user_id: string;
  organization_id: string;
  organization: {
    data: Organization;
  }
  first_name: string;
  last_name: string;
}

export interface OrganizationInvitation {
  id: string;
  type: "organization_invitation";
  attributes: OrganizationInvitationAttributes;
}

export interface OrganizationInvitationAttributes {
  email: string;
  role: OrganizationMembershipRole;
  created_at?: string;
  organization_id: string;
  updated_at?: string;
  token: string;
}


export const OrganizationMembershipRoles = ["admin"] as const;

export type OrganizationMembershipRole = (typeof OrganizationMembershipRoles)[number];

export interface Review {
  id: string;
  type: "review";
  attributes: {
    rating: number;
    comment: string;
    created_at: string;
    verified: boolean;
    user: {
      first_name: string;
      last_name: string;
    };
  };
  relationships: {
    organization: BaseRelation<OrganizationRelation>;
    user?: BaseRelation<ClientRelation>;
  };
  characteristics: ReviewCharacteristics;
}

export interface GoogleReview {
  author_name: string;
  author_url: string;
  language: string;
  profile_photo_url: string;
  rating: number;
  relative_time_description: string;
  text: string;
}

export interface OrganizationReviews {
  average: number;
  one_star_count: number;
  two_star_count: number;
  three_star_count: number;
  four_star_count: number;
  five_star_count: number;
}

export interface OrganizationCharacteristics {
  new: boolean;
}

export interface ReviewCharacteristics {
  new: boolean;
}

export const processOrganization = (org: Organization) => {
  return org;
};

// export const calculateCharacteristicsOrg = (org: Organization) => {
//   const { created_at } = org.attributes;
//   const created = new Date(created_at);
//   const now = new Date();
//   const diff = now.getTime() - created.getTime();
//   const diffDays = Math.ceil(diff / (1000 * 3600 * 24));

//   return {
//     new: diffDays <= 30,
//   };
// };

// export const calculateCharacteristicsReview = (review: Review) => {
//   const { created_at } = review.attributes;
//   const created = new Date(created_at);
//   const now = new Date();
//   const diff = now.getTime() - created.getTime();
//   const diffDays = Math.ceil(diff / (1000 * 3600 * 24));

//   return {
//     new: diffDays <= 2,
//   };
// };

// export const userCanAccessOrganization = (
//   org: Organization,
//   user: IUser | undefined
// ) => {
//   const { owner } = org.relationships;
//   if (owner && user) {
//     return (
//       owner.data?.id === user.id || user.attributes.account_type == "admin"
//     );
//   }
//   return false;
// };
