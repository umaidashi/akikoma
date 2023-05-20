"use client";
import { User } from "@prisma/client";
import Image from "next/image";
import { signOut, signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Navbar({
  user,
}: {
  user: Omit<User, "createdAt" | "updatedAt" | "emailVerified"> | null;
}) {
  const router = useRouter();
  const [menuVisible, setMenuVisible] = useState<boolean>(false);
  return (
    <div className="sticky top-0 mb-4 pb-2 border-b border-gray-200 bg-white">
      <h2 className="text-3xl text-center font-Righteous cursor-default select-none">
        Akikoma
      </h2>
      <div className="absolute right-0 top-0">
        {user ? (
          <div className="flex items-center relative py-1">
            <Image
              className="rounded-full cursor-pointer"
              src={user.image ? user.image : "/../public/user.png"}
              alt={user.name ? user.name : user.id}
              width={28}
              height={28}
              priority={false}
              onClick={() => setMenuVisible(!menuVisible)}
            />
            {menuVisible && (
              <div className="absolute w-32 p-3 bg-white rounded-xl right-0 top-8 shadow-2xl">
                <button
                  className="text-base font-medium mb-1 border-b"
                  onClick={() => {
                    router.push("/account");
                    setMenuVisible(!menuVisible);
                  }}
                >
                  {user.name}
                </button>
                <button
                  className="text-sm text-red-500 hover:underline"
                  onClick={() => signOut()}
                >
                  Sign out
                </button>
              </div>
            )}
          </div>
        ) : (
          <button onClick={() => signIn()}>Sign in</button>
        )}
      </div>
    </div>
  );
}
