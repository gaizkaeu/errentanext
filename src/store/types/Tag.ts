export interface Tag {
  type: "tag";
  id: string;
  attributes: {
    name: string;
    emoji: string;
    hex_color?: string;
    taggings_count: number;
  };
}

export interface VerifiedTag {
  name: string;
  verified: boolean;
}
