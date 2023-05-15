import { getServerSession } from "next-auth/next";

import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export default async function getAllUsers() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return;
    }

    const users = await prisma.user.findMany({
      include: {
        followers: true,
        following: true,
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
