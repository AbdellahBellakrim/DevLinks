export type LinkType = {
  id: number;
  link: string;
  platform: string;
  user_id: number;
};

export type userType = {
  id: number;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  profile_picture: string | null;
  links: LinkType[];
};

export type previewUserType = {
  firstname: string;
  lastname: string;
  email: string;
  profile_picture: string;
  links: {
    id: number;
    link: string;
    platform: string;
  }[];
};

export type previewLinkType = {
  link: string;
  platform: string;
  id: number;
};
