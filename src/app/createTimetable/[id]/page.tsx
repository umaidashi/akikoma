import CreateTimetable from "@/app/components/CreateTimetable";
import getTemplateTimetableById from "../../actions/getTemplateTimetableById";
import getCurrentUser from "@/app/actions/getCurrentUser";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const data = await getTemplateTimetableById({ id });
  const templateTimetable = data?.userTemplateTimetable;
  const currentUser = await getCurrentUser();

  if (!templateTimetable) return;
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
