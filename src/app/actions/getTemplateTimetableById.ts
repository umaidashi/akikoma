import { prisma } from "@/db";

interface IParams {
  id?: string;
}

export default async function getTemplateTimetableById(params: IParams) {
  try {
    const { id } = params;
    if (!id) return null;
    const userTemplateTimetable = await prisma.templateTimetable.findUnique({
      where: {
        id: id,
      },
      include: {
        user: true,
        templateKoma: {
          orderBy: {
            name: "asc",
          },
        },
        university: true,
      },
    });

    if (!userTemplateTimetable) return null;
    return { userTemplateTimetable };
  } catch (error) {
    return { error };
  }
}
