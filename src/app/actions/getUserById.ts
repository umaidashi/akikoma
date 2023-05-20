import { prisma } from "@/db";

interface IParams {
  userId?: string;
}

export default async function getRelationsById(params: IParams) {
  try {
    const { userId } = params;
    if (!userId) return null;
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        follower: true,
        following: true,
        university: true,
        Timetable: true,
        komas: true,
      },
    });

    if (!user) return null;
    return { user };
  } catch (error) {
    return { error };
  }
}
