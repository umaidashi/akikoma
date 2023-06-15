import prisma from "@/lib/prisma";

export default async function getAllUsers() {
  try {
    const groups = await prisma.group.findMany({
      include: {
        owner: true,
        createdBy: true,
        groupTimetable: true,
        groupUser: true,
      },
    });

    if (!groups) {
      return null;
    }

    return { groups };
  } catch (error: any) {
    return null;
  }
}
