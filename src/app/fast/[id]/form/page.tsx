import getFastGroupById from "@/app/actions/getFastGroupById";
import FastForm from "../../FastForm";
import getFastTimetablesById from "@/app/actions/getFastTimetablesById";
import getTemplateTimetableById from "@/app/actions/getTemplateTimetableById";

export default async function Page({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const fastGroup = await getFastGroupById({ id: params.id });
  const fastTimetables = await getFastTimetablesById({ id: params.id });
  const templateTimetable = await getTemplateTimetableById({
    id: fastGroup?.fastGroup?.templateTimetableId as string,
  });

  if (
    !fastGroup?.fastGroup ||
    !fastTimetables?.fastTimetables ||
    !templateTimetable?.userTemplateTimetable
  )
    return null;

  return (
    <FastForm
      fastGroup={fastGroup?.fastGroup}
      fastTimetables={fastTimetables?.fastTimetables}
      fastTemplate={templateTimetable?.userTemplateTimetable}
    />
  );
}
