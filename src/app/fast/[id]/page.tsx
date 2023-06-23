import getFastGroupById from "@/app/actions/getFastGroupById";
import FastById from "../FastById";
import getFastTimetablesById from "@/app/actions/getFastTimetablesById";
import First from "../First";
import { getKomasByFastIds } from "@/app/actions/getKomasByIds";
import { KomaWithAll } from "@/types/koma";

export default async function Page({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const first = searchParams?.first === "true";
  const BASE_URL = process.env.PUBLIC_NEXT_APP_BASE_URL;

  const fastGroup = await getFastGroupById({ id: params.id });
  const fastTimetables = await getFastTimetablesById({ id: params.id });
  const timetableIds = fastTimetables?.fastTimetables?.map((t) => t.id);
  const fastKomas = await getKomasByFastIds({ timetableIds: timetableIds });

  if (!fastGroup?.fastGroup || !fastTimetables?.fastTimetables) return;

  if (first) {
    return (
      <First
        fastGroup={fastGroup.fastGroup}
        fastTimetables={fastTimetables.fastTimetables}
        baseUrl={BASE_URL as string}
      />
    );
  } else {
    return (
      <FastById
        fastGroup={fastGroup.fastGroup}
        fastTimetables={fastTimetables.fastTimetables}
        fastKomas={fastKomas?.komas as KomaWithAll[]}
        baseUrl={BASE_URL as string}
      />
    );
  }
}
