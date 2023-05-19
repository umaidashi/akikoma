import { prisma } from "@/db";
import { NextResponse } from "next/server";
import "server-only";

export async function POST(request: Request) {
  const body = await request.json();
  const { name, startH, startM, endH, endM, templateTimetable } = body;
  Object.keys(body).forEach((value: any) => {
    if (!body[value]) {
      NextResponse.error();
    }
  });

  const templateKoma = await prisma.templateKoma.create({
    data: {
      name,
      startH,
      startM,
      endH,
      endM,
      templateTimetableId: templateTimetable.id,
    },
  });

  return NextResponse.json(templateKoma);
}
