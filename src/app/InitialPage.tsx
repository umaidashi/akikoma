"use client";

import { useRouter } from "next/navigation";
import { Button, Typography } from "./components/MaterialReact";
import { signIn } from "next-auth/react";
import { CurrentUserType } from "@/types/user";

export default function InitialPage({
  currentUser,
}: {
  currentUser: CurrentUserType | undefined | null;
}) {
  const router = useRouter();

  if (currentUser) {
    if (currentUser.Timetable.length > 0) {
      router.push("/home");
    } else {
      router.push("/createTimetable");
    }
  }
  if (currentUser) return null;
  return (
    <div>
      <Typography className="mb-2 text-sm">
        <span className="font-bold">「Akikoma」</span>
        は、友人と共通の空きコマを <br></br>
        <span className="text-pink-400 font-bold">「直感的」</span>に把握できる
        <span className="underline decoration-pink-300">SNS</span>
        です。
      </Typography>
      <Typography className="mb-2 text-sm">
        <span className="text-pink-400 font-bold">フォローしている友人</span>
        の空きコマをリアルタイムに、
        <br />
        <span className="text-pink-400 font-bold">
          グループに参加している友人
        </span>
        の空きコマをリアルタイムに、
        <br />
        確認することができます。
      </Typography>
      <div className="flex justify-between items-center text-lg font-bold border-l-[4px] p-2 my-4">
        Akikomaを始める
      </div>
      <Button
        color="pink"
        variant="gradient"
        onClick={() => router.push("/register")}
        fullWidth
        className="text-md my-4"
      >
        登録
      </Button>
      <Button
        color="pink"
        variant="outlined"
        onClick={() => signIn()}
        fullWidth
        className="text-md my-4"
      >
        ログイン
      </Button>
    </div>
  );
}
