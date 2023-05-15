import { User } from "@prisma/client";

export interface UserWithFollowing extends User {
  following: { followerId: string; followingId: string }[];
  followers: { followerId: string; followingId: string }[];
}
