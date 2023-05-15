import { prisma } from "@/db";
import { NextResponse } from "next/server";
import "server-only";

export async function POST(request: Request) {
  const body = await request.json();
  const { followerId, followingId } = body;

  Object.keys(body).forEach((value: any) => {
    if (!body[value]) {
      NextResponse.error();
    }
  });

  const universities = await prisma.relationships.create({
    data: {
      followerId,
      followingId,
    },
  });

  return NextResponse.json(universities);
}
