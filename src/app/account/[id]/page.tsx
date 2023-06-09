import Image from "next/image";
import getCurrentUser from "../../actions/getCurrentUser";
import Account from "./Account";
import { UserWithAll } from "@/types/user";
import getTimetableById from "../../actions/getTimetableById";
import getUserById from "@/app/actions/getUserById";

export default async function Page({ params }: { params: { id: string } }) {
  const currentUser = await getCurrentUser();
  const user = await getUserById({ userId: params.id });
  const timetable = await getTimetableById({ userId: params.id });
  if (!user?.user || !currentUser) return null;

  return (
    <Account user={user.user} currentUser={currentUser} timetables={timetable?.timetables} />
  );
}
