import { Koma, Timetable, User } from "@prisma/client";

export type CreatedTimetableType = {
  createdAt: string;
  id: string;
  updatedAt: string;
  userId: string;
};

export type TimetableWithAll = Timetable & {
  user: User;
  komas: Koma[];
};
