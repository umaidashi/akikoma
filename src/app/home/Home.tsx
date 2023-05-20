"use client"

import { FollowingsType, RelationshipsType } from "@/types/relationships";
import { CurrentUserType } from "@/types/user";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home({
  currentUser,
  followings,
}: {
  currentUser: CurrentUserType;
  followings: FollowingsType[] | undefined;
}) {
  const router = useRouter();
  return (
    <div>
      <div>
        <div className="flex gap-2 overflow-x-auto">
          {followings?.map((f) => (
            <div key={f.followingId} className="min-w-[52px] text-center">
              <div
                className="rounded-full border p-1 border-gray-400 cursor-pointer"
                onClick={() => router.push(`/account/${f.followingId}`)}
              >
                <Image
                  src={f.following?.image ? f.following.image : "/user.png"}
                  alt={f.following?.name ? f.following?.name : ""}
                  width={42}
                  height={42}
                  className="rounded-full"
                />
              </div>
              <div className="text-xs text-gray-700 mt-1">
                {f.following?.name}
              </div>
            </div>
          ))}
        </div>
        <hr className="my-3" />
      </div>
    </div>
  );
}
