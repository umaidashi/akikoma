import getFastTimetablesById from "@/app/actions/getFastTimetablesById";
import FastInvite from "../../FastInvite";
import getFastGroupById from "@/app/actions/getFastGroupById";
import { getKomasByFastIds } from "@/app/actions/getKomasByIds";
import { KomaWithAll } from "@/types/koma";

export default async function Page({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const fastGroup = await getFastGroupById({ id: params.id });
  const fastTimetables = await getFastTimetablesById({ id: params.id });
  const timetableIds = fastTimetables?.fastTimetables?.map((t) => t.id);
  const fastKomas = await getKomasByFastIds({ timetableIds: timetableIds });

  if (
    !fastGroup?.fastGroup ||
    !fastTimetables?.fastTimetables ||
    !fastKomas?.komas
  )
    return null;
  return (
    <FastInvite
      fastGroup={fastGroup?.fastGroup}
      fastTimetables={fastTimetables?.fastTimetables}
      fastKomas={fastKomas.komas as KomaWithAll[]}
    />
  );
}
