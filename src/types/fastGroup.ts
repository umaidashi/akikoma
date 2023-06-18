import { FastGroup, TemplateTimetable } from "@prisma/client";

export type FastGroupWithAll = FastGroup & {
  templateTimetable: TemplateTimetable;
};
