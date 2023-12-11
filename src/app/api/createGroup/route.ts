import { prisma } from "@/db";
import { NextResponse } from "next/server";
import "server-only";

export async function POST(request: Request) {
  const body = await request.json();
  const { name, isPublic, userId } = body;

  Object.keys(body).forEach((value: any) => {
    if (!body[value]) {
      NextResponse.error();
    }
  });

  const group = await prisma.group.create({
    data: {
      name,
      public: isPublic,
      createdById: userId,
      ownerId: userId,
    },
  });

  const userTimetable = await prisma.timetable.findFirst({
    where: {
      userId: userId,
    },
    include: {
      user: true,
      komas: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  if (!userTimetable) return;

  await prisma.groupUser.create({
    data: {
      userId,
      groupId: group.id,
    },
  });

  await prisma.groupTimetable.create({
    data: {
      groupId: group.id,
      timetableId: userTimetable.id,
    },
  });

  return NextResponse.json(group);
}
