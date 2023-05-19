import { University } from "@prisma/client";
import { Relations } from "./relations";

type User = {
  id: string;
  name: string | null;
  email: string | null;
  emailVerified: Date | null | string;
  password: string | null;
  image: string | null;
  uniId: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export interface UserWithFollowing extends User {
  following: Relations[];
  followers: Relations[];
}
export interface UserWithAll extends User {
  following: Relations[];
  followers: Relations[];
  university: University | null;
}

export type CurrentUserType = Omit<
  UserWithAll,
  "followers" | "uniId" | "createdAt" | "updatedAt"
>;
