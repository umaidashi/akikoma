import prisma from "@/lib/prisma";
import getCurrentUser from "./getCurrentUser";

export default async function getAllUsers() {
  try {
    const currentUser = await getCurrentUser();

    const users = await prisma.user.findMany({
      where: {
        NOT: {
          id: {
            contains: currentUser?.id,
          },
        },
      },
      include: {
        follower: true,
        following: true,
        university: true,
        komas: true,
        Timetable: true,
      },
    });

    if (!users) {
      return null;
    }

    return { users };
  } catch (error: any) {
    return null;
  }
}
