import getTemplateTimetables from "../actions/getTemplateTimetables";
import Fast from "./Fast";

export default async function Page() {
  const templateTimetables = await getTemplateTimetables();
  if (!templateTimetables.templateTimetables) return;
  return (
    <div>
      <Fast templateTimetables={templateTimetables.templateTimetables} />
    </div>
  );
}
