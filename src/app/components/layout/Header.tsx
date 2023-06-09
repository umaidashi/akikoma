"use client";
import { User } from "@prisma/client";
import Image from "next/image";
import { signOut, signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Menu,
  MenuHandler,
  Button,
  MenuList,
  MenuItem,
} from "../MaterialReact";

export default function Navbar({
  user,
}: {
  user: Omit<User, "createdAt" | "updatedAt" | "emailVerified"> | null;
}) {
  const router = useRouter();
  const [menuVisible, setMenuVisible] = useState<boolean>(false);
  return (
    <div className="sticky top-0 mb-4 p-2 border-b border-gray-200 bg-white z-50">
      <h2 className="text-3xl text-center font-Righteous cursor-default select-none">
        Akikoma
      </h2>
      <div className="absolute right-0 top-0">
        {user && (
          <div className="flex items-center relative p-3">
            <Menu>
              <MenuHandler>
                <Image
                  className="rounded-full cursor-pointer"
                  src={user.image ? user.image : "/user.png"}
                  alt={user.name ? user.name : user.id}
                  width={32}
                  height={32}
                  priority={false}
                  onClick={() => setMenuVisible(!menuVisible)}
                />
              </MenuHandler>
              <MenuList>
                <MenuItem
                  onClick={() => {
                    router.push(`/account/${user.id}`);
                    setMenuVisible(!menuVisible);
                  }}
                  className="text-base font-medium mb-1 border-b"
                >
                  {user.name}
                </MenuItem>
                <MenuItem
                  onClick={() => signOut()}
                  className="text-sm text-red-500 hover:underline"
                >
                  SignOut
                </MenuItem>
              </MenuList>
            </Menu>
          </div>
        )}
      </div>
    </div>
  );
}
