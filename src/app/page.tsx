import prisma from "@/lib/prisma";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(authOptions);
  console.log(session);
  if (!session) {
    redirect("/api/auth/signin");
  }

  const star = await prisma.star.findMany({});
  const user = await prisma.user.findUnique({
    where: { email: session.user?.email },
  });

  console.log(user);

  return (
    <>
      <div>
        <h1>akikoma</h1>
        {star.map((s) => (
          <div>{s.name}</div>
        ))}
      </div>
      <div className="flex items-center">
        <div className="mr-2
        ">{user.name}</div>
        <Image
          className="rounded-full"
          src={user.image}
          alt={user.name}
          width={30}
          height={30}
          priority={false}
        />
      </div>
    </>
  );
}
