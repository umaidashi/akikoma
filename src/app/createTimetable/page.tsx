import Link from "next/link";
import getTemplateTimetables from "../../actions/getTemplateTimetables";

export default async function Page() {
  const templateTimetables = await getTemplateTimetables();
  return (
    <div>
      <div>createTimetable</div>
      {templateTimetables.templateTimetables &&
        templateTimetables.templateTimetables.map((t) => (
          <div key={t.id} className="flex">
            <div>{t.name}</div>
            <Link href={`/createTimetable/${t.id}`}>select</Link>
          </div>
        ))}
    </div>
  );
}
