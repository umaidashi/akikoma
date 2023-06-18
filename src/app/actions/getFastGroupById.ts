import { prisma } from "@/db";

interface IParams {
  id: string;
}

export default async function getFastGroupById(params: IParams) {
  try {
    const { id } = params;
    if (!id) return null;

    const fastGroup = await prisma.fastGroup.findUnique({
      where: {
        id,
      },
      include: {
        templateTimetable: true,
      },
    });

    if (!fastGroup) return null;
    return { fastGroup };
  } catch (error) {
    return { error };
  }
}
