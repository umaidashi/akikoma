import { prisma } from "@/db";
import { NextResponse } from "next/server";
import "server-only";

export async function POST(request: Request) {
  const body = await request.json();
  const { name, fastGroupId } = body;

  Object.keys(body).forEach((value: any) => {
    if (!body[value]) {
      NextResponse.error();
    }
  });

  const timetable = await prisma.fastTimetable.create({
    data: {
      name,
      fastGroupId,
    },
  });

  return NextResponse.json(timetable);
}
