import { University, User } from "@prisma/client";
import { Relations } from "./relations";

export interface UserWithFollowing extends User {
  following: Relations[];
  followers: Relations[];
}
export interface UserWithAll extends User {
  following: Relations[];
  followers: Relations[];
  university: University;
}
