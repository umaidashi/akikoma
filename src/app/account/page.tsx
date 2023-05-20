import Image from "next/image";
import getCurrentUser from "../actions/getCurrentUser";
import Account from "./Account";
import { UserWithAll } from "@/types/user";
import getTimetableById from "../actions/getTimetableById";

export default async function Page() {
  const user = await getCurrentUser();
  if (!user) return null;
  return <Account user={user as unknown as UserWithAll} />;
}
