import { prisma } from "@/db";

export default async function getTemplateTimetables() {
  try {
    const templateTimetables = await prisma.templateTimetable.findMany({
      include: {
        user: true,
        university: true,
        templateKoma: true,
      },
    });
    return { templateTimetables };
  } catch (error) {
    return { error };
  }
}
