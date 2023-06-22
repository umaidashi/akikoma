import { KomaWithAll } from "@/types/koma";
import getCurrentUser from "../actions/getCurrentUser";
import getKomasByIds from "../actions/getKomasByIds";
import getRelationsById from "../actions/getRelationsById";
import getTimetableById from "../actions/getTimetableById";
import Home from "./Home";

export default async function Page() {
  const currentUser = await getCurrentUser();
  if (!currentUser) return null;
  const relationships = await getRelationsById({ userId: currentUser.id });

  const userIds =
    relationships?.followings &&
    relationships?.followings.map((f) => f.followingId);
  userIds?.push(currentUser.id);

  const followingsTimetable = await getTimetableById({ userId: userIds });

  const timetableIds = followingsTimetable?.timetables?.map((t) => t.id);

  const followingsKomas = await getKomasByIds({ timetableIds: timetableIds });

  return (
    <div>
      <Home
        currentUser={currentUser}
        followings={relationships?.followings}
        followingsKomas={followingsKomas?.komas as KomaWithAll[]}
        followingsTimetable={followingsTimetable?.timetables}
      />
    </div>
  );
}
