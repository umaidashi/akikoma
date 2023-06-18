import { prisma } from "@/db";
import { NextResponse } from "next/server";
import "server-only";

export async function POST(request: Request) {
  const body = await request.json();
  const { name, password, templateTimetableId } = body;

  Object.keys(body).forEach((value: any) => {
    if (!body[value]) {
      NextResponse.error();
    }
  });

  const group = await prisma.fastGroup.create({
    data: {
      name,
      templateTimetableId,
      password,
    },
  });

  return NextResponse.json(group);
}
