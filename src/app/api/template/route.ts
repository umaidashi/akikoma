import { prisma } from "@/db";
import { NextResponse } from "next/server";
import "server-only";

export async function POST(request: Request) {
  const body = await request.json();
  const { name, userId } = body;

  Object.keys(body).forEach((value: any) => {
    if (!body[value]) {
      NextResponse.error();
    }
  });

  const universities = await prisma.templateTimetable.create({
    data: {
      name,
      userId,
    },
  });

  return NextResponse.json(universities);
}
