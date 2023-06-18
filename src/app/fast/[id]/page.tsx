import getFastGroupById from "@/app/actions/getFastGroupById";
import FastById from "../FastById";
import getFastTimetablesById from "@/app/actions/getFastTimetablesById";
import First from "../First";

export default async function Page({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const first = searchParams?.first === "true";

  const fastGroup = await getFastGroupById({ id: params.id });
  const fastTimetables = await getFastTimetablesById({ id: params.id });

  if (!fastGroup?.fastGroup || !fastTimetables?.fastTimetables) return;

  if (first)
    return (
      <First
        fastGroup={fastGroup.fastGroup}
        fastTimetables={fastTimetables.fastTimetables}
      />
    );
  return (
    <div>
      <FastById
        fastGroup={fastGroup.fastGroup}
        fastTimetables={fastTimetables.fastTimetables}
      />
    </div>
  );
}
