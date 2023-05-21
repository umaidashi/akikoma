import { getServerSession } from "next-auth/next";

import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import getCurrentUser from "./getCurrentUser";

export default async function getAllUsers() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return null;
    }

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
