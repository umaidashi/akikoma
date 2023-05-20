import { prisma } from "@/db";
import { NextResponse } from "next/server";
import "server-only";

export async function POST(request: Request) {
  const body = await request.json();
  const { name, email, password, image, uniId } = body;
  Object.keys(body).forEach((value: any) => {
    if (!body[value]) {
      NextResponse.error();
    }
  });

  const users = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (users) return NextResponse.error();

  const timetable = await prisma.user.create({
    data: {
      name,
      email,
      password,
      image,
      uniId,
    },
    include: {
      komas: true,
    },
  });

  return NextResponse.json(timetable);
}
