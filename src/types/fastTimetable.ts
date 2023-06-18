import { FastTimetable, Koma } from "@prisma/client";

export type FastTimetableWithKomas = FastTimetable & {komas: Koma[]}