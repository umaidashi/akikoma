import { prisma } from "@/db";

export default async function getTemplateKomas() {
  try {
    const templateKomas = await prisma.templateKoma.findMany({
      include: {
        templateTimetable: true,
      },
      orderBy: {
        startH: "asc"
      }
    });
    return { templateKomas };
  } catch (error) {
    return { error };
  }
}
