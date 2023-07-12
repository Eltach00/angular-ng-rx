export interface FollowResponse {
  profile: Profile;
}

export interface Profile {
  username: string;
  bio: any;
  image: string;
  following: boolean;
}
