import Link from "next/link";
import getTemplateTimetables from "../actions/getTemplateTimetables";
import CreateTimetable from "./[id]/CreateTimetable";
import getCurrentUser from "../actions/getCurrentUser";
import getTemplateTimetableById from "../actions/getTemplateTimetableById";

export default async function Page() {
  const templateTimetables = await getTemplateTimetables();
  // <div>
  //   <div>createTimetable</div>
  //   {templateTimetables.templateTimetables &&
  //     templateTimetables.templateTimetables.map((t) => (
  //       <div key={t.id} className="flex">
  //         <div>{t.name}</div>
  //         <Link href={`/createTimetable/${t.id}`}>select</Link>
  //       </div>
  //     ))}
  // </div>
  const id = "clhvhq0ow00077lupqaq6h5w4";
  const data = await getTemplateTimetableById({ id });
  const templateTimetable = data?.userTemplateTimetable;
  const currentUser = await getCurrentUser();

  if (!templateTimetable) return null;
  if (!currentUser) return null;

  return (
    <div>
      <CreateTimetable
        currentUser={currentUser}
        templateTimetable={templateTimetable}
      />
    </div>
  );
}
