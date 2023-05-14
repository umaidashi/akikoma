import { User } from "@prisma/client";
import Image from "next/image";

export default function Navbar({ user }: { user: User | null }) {
  if (!user) return null;
  return (
    <div className="flex items-center">
      <div className="mr-2">{user.name}</div>
      {user.image && user.name && (
        <Image
          className="rounded-full"
          src={user.image}
          alt={user.name}
          width={30}
          height={30}
          priority={false}
        />
      )}
    </div>
  );
}
