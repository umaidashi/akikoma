import { prisma } from "@/db";
import { Koma, Timetable, User } from "@prisma/client";

interface IParams {
  groupId: string | undefined;
}

export default async function getKomasByIds(params: IParams) {
  try {
    const { groupId } = params;
    if (!groupId) return null;

    const group = await prisma.group.findUnique({
      where: {
        id: groupId,
      },
      include: {
        owner: true,
        createdBy: true,
      },
    });

    const groupUser = await prisma.groupUser.findMany({
      where: {
        groupId,
      },
      include: {
        user: true,
      },
    });
    const groupTimetable = await prisma.groupTimetable.findMany({
      where: {
        groupId,
      },
      include: {
        timetable: true,
      },
    });

    if (!group || !groupUser || !groupTimetable) return null;
    return { group, groupUser, groupTimetable };
  } catch (error) {
    return { error };
  }
}
