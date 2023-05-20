import { prisma } from "@/db";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";
import "server-only";

export async function POST(request: Request) {
  const body = await request.json();
  const { name, day, startH, startM, endH, endM, timetableId } = body.data;

  Object.keys(body).forEach((value: any) => {
    if (!body[value]) {
      NextResponse.error();
    }
  });

  const koma = await prisma.koma.create({
    data: {
      name,
      day,
      startH,
      startM,
      endH,
      endM,
      timetableId,
    },
  });

  return NextResponse.json(koma);
}
