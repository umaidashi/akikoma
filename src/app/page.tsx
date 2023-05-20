import getCurrentUser from "@/app/actions/getCurrentUser";
import getTemplateKomas from "@/app/actions/getTemplateKomas";
import getTemplateTimetables from "@/app/actions/getTemplateTimetables";
import getUniversities from "@/app/actions/getUniversities";
import CreateTemplateTimetable from "@/app/createTimetable/CreateTemplateTimetable";

export default async function Home() {
  const universities = await getUniversities();
  const currentUser = await getCurrentUser();
  const templateTimetables = await getTemplateTimetables();
  const templateKomas = await getTemplateKomas();

  return (
    <>
      <div>
          <CreateTemplateTimetable
            universities={universities.universities}
            currentUser={currentUser}
            templateTimetables={templateTimetables.templateTimetables}
            templateKomas={templateKomas.templateKomas}
          />
      </div>
    </>
  );
}
