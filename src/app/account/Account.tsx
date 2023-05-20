"use client";
import { TimetableWithAll } from "@/types/timetable";
import { UserWithAll } from "@/types/user";
import { Prisma, User } from "@prisma/client";
import { time } from "console";
import Image from "next/image";
import { useState } from "react";

export default function Mypage({
  user,
}: {
  user: UserWithAll;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      setFile(files[0]);
      setPreview(URL.createObjectURL(files[0]));
    }
  };
  console.log(preview);

  return (
    <div>
      <div className="flex items-center flex-col my-8">
        <Image
          src={
            preview ? preview : user.image ? user.image : "/../public/user.png"
          }
          alt={user.name ? user.name : ""}
          width={180}
          height={180}
          className="rounded-full mb-4 h-[180px] w-[180px] object-cover"
        />
        {/* <input
          name="file"
          type="file"
          accept="image/*"
          onChange={onChangeFile}
        /> */}
        <div className="text-3xl font-bold">{user.name}</div>
      </div>
      <div>
        <div>mail : {user.email}</div>
        <div>uni : {user.university?.name}</div>
      </div>
    </div>
  );
}
