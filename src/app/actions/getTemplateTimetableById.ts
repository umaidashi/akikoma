import { prisma } from "@/db";

interface IParams {
  userId?: string;
}

export default async function getTemplateTimetableById(params: IParams) {
  try {
    const { userId } = params;
    if (!userId) return null;
    const userTemplateTimetable = await prisma.templateTimetable.findMany({
      where: {
        userId: userId,
      },
      include: {
        user: true,
      },
      orderBy: {
        createdAt: "desc"
      }
    });

    if (!userTemplateTimetable) return null;
    return { userTemplateTimetable };
  } catch (error) {
    return { error };
  }
}
