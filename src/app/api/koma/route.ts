import { prisma } from "@/db";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";
import "server-only";

export async function POST(request: Request) {
  const body = await request.json();
  const {
    name,
    day,
    num,
    aki,
    startH,
    startM,
    endH,
    endM,
    timetableId,
    userId,
    fastTimetableId,
  } = body.data;

  Object.keys(body).forEach((value: any) => {
    if (!body[value]) {
      NextResponse.error();
    }
  });

  const koma = await prisma.koma.create({
    data: {
      name,
      day,
      num,
      aki,
      startH,
      startM,
      endH,
      endM,
      timetableId,
      userId,
      fastTimetableId,
    },
  });

  return NextResponse.json(koma);
}
