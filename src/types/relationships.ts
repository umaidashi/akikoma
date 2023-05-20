import { Relationships, User } from "@prisma/client";

export type RelationshipsType = {
  followings:
    | (Relationships & {
        following: User | undefined | null;
        follower: User | undefined | null;
      })[]
    | undefined;
  followers:
    | (Relationships & {
        following: User | undefined | null;
        follower: User | undefined | null;
      })[]
    | undefined;
};

export type FollowingsType = Relationships & {
  following: User | undefined | null;
  follower: User | undefined | null;
};

export type FollowersType = Relationships & {
  following: User | undefined | null;
  follower: User | undefined | null;
};
