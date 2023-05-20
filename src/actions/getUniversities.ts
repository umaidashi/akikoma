import { prisma } from "@/db";

export default async function getUniversities() {
  try {
    const universities = await prisma.university.findMany();
    return { universities };
  } catch (error) {
    return { error };
  }
}
