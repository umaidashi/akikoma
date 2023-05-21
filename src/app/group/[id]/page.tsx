import getGroupById from "@/app/actions/getGroupById";
import GroupDetail from "./GroupDetail";
import getKomasByIds from "@/app/actions/getKomasByIds";
import getCurrentUser from "@/app/actions/getCurrentUser";

export default async function Page({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const res = await getGroupById({ groupId: params.id });
  const currentUser = await getCurrentUser();
  const group = res?.group;
  const groupUser = res?.groupUser;
  const groupTimetables = res?.groupTimetable?.filter(
    (t) => t.timetable.selected
  );
  const timetableIds = groupTimetables?.map((f) => f.timetableId);

  const komas = await getKomasByIds({ timetableIds });

  return (
    <div>
      <GroupDetail
        group={group}
        groupUser={groupUser}
        groupTimetables={groupTimetables}
        komas={komas?.komas}
        currentUser={currentUser}
      />
    </div>
  );
}
