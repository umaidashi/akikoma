import { prisma } from "@/db";

interface IParams {
  userId?: string;
}

export default async function getRelationsById(params: IParams) {
  try {
    const { userId } = params;
    if (!userId) return null;
    const followings = await prisma.relationships.findMany({
      where: {
        followerId: userId,
      },
      include: {
        follower: true,
        following: true,
      },
    });
    const followers = await prisma.relationships.findMany({
      where: {
        followingId: userId,
      },
      include: {
        follower: true,
        following: true,
      },
    });

    if (!followings || !followers) return null;
    return { followings, followers };
  } catch (error) {
    return { error };
  }
}
