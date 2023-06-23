import { prisma } from "@/db";
import { Koma, Timetable, User } from "@prisma/client";

interface IParams {
  timetableIds: string[] | undefined;
}

export default async function getKomasByIds(params: IParams) {
  try {
    const { timetableIds } = params;
    if (!timetableIds) return null;

    const komas = await prisma.koma.findMany({
      where: {
        timetableId: { in: timetableIds },
      },
      include: {
        user: true,
        timetable: true,
      },
    });

    if (!komas) return null;
    return { komas };
  } catch (error) {
    return { error };
  }
}

export async function getKomasByFastIds(params: IParams) {
  try {
    const { timetableIds } = params;
    if (!timetableIds) return null;

    const komas = await prisma.koma.findMany({
      where: {
        fastTimetableId: { in: timetableIds },
      },
      include: {
        user: true,
        timetable: true,
      },
    });

    if (!komas) return null;
    return { komas };
  } catch (error) {
    return { error };
  }
}
