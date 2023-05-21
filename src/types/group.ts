import {
  Group,
  GroupTimetable,
  GroupUser,
  Timetable,
  User,
} from "@prisma/client";

export type GroupWithAll = Group & {
  groupTimetable: GroupTimetable[];
  groupUser: GroupUser[];
  createdBy: User;
  owner: User;
};

export type GroupUserWithUser = GroupUser & {
  user: User;
};

export type GroupTimetableWithTimetable = GroupTimetable & {
  timetable: Timetable;
};
