import { Koma, Timetable, University } from "@prisma/client";
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
  follower: Relations[];
}
export interface UserWithAll extends User {
  following: Relations[];
  follower: Relations[];
  university: University | null;
  Timetable: Timetable[];
  komas: Koma[]
}

export type CurrentUserType = Omit<
  UserWithAll,
  "uniId" | "createdAt" | "updatedAt"
>;
