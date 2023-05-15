"use client";

import { UserWithFollowing } from "@/types/user";
import { User, Prisma } from "@prisma/client";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Following({
  users,
  currentUser,
}: {
  users: User[];
  currentUser: Omit<
    UserWithFollowing,
    "createdAt" | "updatedAt" | "emailVerified"
  >;
}) {
  const router = useRouter();

  const onFollow = (followingId: string) => {
    axios
      .post("/api/following", {
        followingId: followingId,
        followerId: currentUser.id,
      })
      .then(() => {})
      .catch((error) => {
        alert(error);
      })
      .finally(() => {
        router.refresh();
      });
  };
  return (
    <div>
      <ul>
        {users &&
          users.map((user) => {
            if (user.id === currentUser.id) return;
            return (
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
                {currentUser.following?.filter(
                  (f) => f.followingId === user.id
                ) ? (
                  <div className="text-gray-500 w-fit border border-gray-500 cursor-default transition-opacity focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-1.5 text-cente opacity-30">
                    フォロー済
                  </div>
                ) : (
                  <button
                    onClick={() => onFollow(user.id)}
                    className="text-white w-fit bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 hover:opacity-70 cursor-pointer transition-opacity focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-1.5 text-center"
                  >
                    フォローする
                  </button>
                )}
              </div>
            );
          })}
      </ul>
    </div>
  );
}
