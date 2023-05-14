import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";
// import { Prisma } from "@prisma/client";
import "server-only";

export async function getUniversities() {
  try {
    const universities = await prisma.university.findMany();
    return { universities };
  } catch (error) {
    return { error };
  }
}

export async function createUniversities(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { name } = req.body;
  const university = {
    name: name,
  };
  try {
    const universitiesFromDb = await prisma.university.create({
      data: university,
    });
    return { universities: universitiesFromDb };
  } catch (error) {
    return { error: "hogehoge" };
  }
}
