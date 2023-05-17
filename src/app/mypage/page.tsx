import Image from "next/image";
import getCurrentUser from "../actions/getCurrentUser";
import Mypage from "./Mypage";
import { UserWithAll } from "@/types/user";

export default async function Page() {
  const user = await getCurrentUser();
  if (!user) return null;
  return <Mypage user={user as unknown as UserWithAll} />;
}
