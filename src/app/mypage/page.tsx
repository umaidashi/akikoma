import Image from "next/image";
import getCurrentUser from "../../actions/getCurrentUser";
import Mypage from "./Mypage";
import getTimetableById from "../../actions/getTimetableById";

export default async function Page() {
  const user = await getCurrentUser();
  if (!user) return null;
  const timetables = await getTimetableById({ userId: user.id });
  return <Mypage timetables={timetables?.timetables} />;
}
