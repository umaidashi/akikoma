import { Koma, Timetable, User } from "@prisma/client";

export type KomaWithAll = Koma & {
  timetable: Timetable;
  user: User;
};
