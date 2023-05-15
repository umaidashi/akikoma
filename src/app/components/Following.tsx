"use client";

import { User } from "@prisma/client";
import Image from "next/image";

export default function Following({
  users,
  currentUser,
}: {
  users: User[];
  currentUser: Omit<User, "createdAt" | "updatedAt" | "emailVerified">;
}) {
  return (
    <div>
      <ul>
        {users &&
          users.map((user) => (
            <div
              className="flex justify-between items-center my-2"
              key={user.id}
            >
              <div className="flex items-center">
                <Image
                  src={user.image ? user.image : "/../public/user.png"}
                  alt={user.name ? user.name : user.id}
                  width={28}
                  height={28}
                  className="rounded-full mr-1"
                />
                <div>{user.name}</div>
              </div>
              <button className="text-white w-fit bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 hover:opacity-70 cursor-pointer transition-opacity focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-1.5 text-center">
                Follow
              </button>
            </div>
          ))}
      </ul>
    </div>
  );
}
