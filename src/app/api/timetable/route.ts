import { prisma } from "@/db";
import { NextResponse } from "next/server";
import "server-only";

export async function POST(request: Request) {
  const body = await request.json();
  const { userId, name, templateTimetableId } = body;
  Object.keys(body).forEach((value: any) => {
    if (!body[value]) {
      NextResponse.error();
    }
  });

  const timetable = await prisma.timetable.create({
    data: {
      userId,
      name,
      templateTimetableId,
      selected: true,
    },
    include: {
      komas: true,
    },
  });

  return NextResponse.json(timetable);
}
