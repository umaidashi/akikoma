import { prisma } from "@/db";

interface IParams {
  userId?: string;
}

export default async function getTimetableById(params: IParams) {
  try {
    const { userId } = params;
    if (!userId) return null;
    const timetables = await prisma.timetable.findMany({
      where: {
        userId,
      },
      include: {
        user: true,
        komas: {
          orderBy: {
            name: "asc",
          },
        },
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    if (!timetables) return null;
    return { timetables };
  } catch (error) {
    return { error };
  }
}
