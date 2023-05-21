import { prisma } from "@/db";
import { NextResponse } from "next/server";
import "server-only";

export async function POST(request: Request) {
  const body = await request.json();
  const { groupId, timetableId, userId } = body;

  Object.keys(body).forEach((value: any) => {
    if (!body[value]) {
      NextResponse.error();
    }
  });

  // const userTimetable = await prisma.timetable.findFirst({
  //   where: {
  //     userId: userId,
  //   },
  //   include: {
  //     user: true,
  //     komas: true,
  //   },
  //   orderBy: {
  //     createdAt: "asc",
  //   },
  // });

  // if (!userTimetable) return;

  const groupUser = await prisma.groupUser.create({
    data: {
      userId,
      groupId,
    },
  });

  const groupTimetable = await prisma.groupTimetable.create({
    data: {
      groupId,
      timetableId,
    },
  });

  return NextResponse.json({ groupUser, groupTimetable });
}
