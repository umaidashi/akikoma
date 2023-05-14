import { prisma } from "@/db";
import { NextResponse } from "next/server";
import "server-only";

interface IParams {
  universityId?: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  const { universityId } = params;

  console.log(universityId)

  if (!universityId || typeof universityId !== "string") {
    throw new Error("Invalid ID");
  }

  const universities = await prisma.university.deleteMany({
    where: {
      id: universityId,
    },
  });

  return NextResponse.json(universities);
}
