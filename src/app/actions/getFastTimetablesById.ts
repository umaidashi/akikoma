import { prisma } from "@/db";

interface IParams {
  id: string;
}

export default async function getFastTimetablesById(params: IParams) {
  try {
    const { id } = params;
    if (!id) return null;

    const fastTimetables = await prisma.fastTimetable.findMany({
      where: {
        fastGroupId: id,
      },
      include: {
        komas: {
          orderBy: {
            startH: "desc",
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!fastTimetables) return null;
    return { fastTimetables };
  } catch (error) {
    return { error };
  }
}
