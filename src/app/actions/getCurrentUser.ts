import { getServerSession } from "next-auth/next";

import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export default async function getCurrentUser() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return;
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email as string,
      },
      include: {
        follower: true,
        following: true,
        komas: true,
        templateTimetable: true,
        Timetable: true,
        university: true,
      },
      // select: {
      //   id: true,
      //   name: true,
      //   email: true,
      //   password: true,
      //   image: true,
      //   emailVerified: true,
      //   university: true,
      //   follower: {

      //   },
      //   following: {

      //   },
      // },
    });

    if (!currentUser) {
      return null;
    }

    return {
      ...currentUser,
      emailVerified: currentUser.emailVerified?.toISOString() || null,
    };
  } catch (error: any) {
    return null;
  }
}
