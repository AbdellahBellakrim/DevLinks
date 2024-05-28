export type LinkType = {
  link: string;
  platform: string;
  id: number;
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
