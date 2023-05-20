// "use client"

import getCurrentUser from "@/app/actions/getCurrentUser";
import getTemplateKomas from "@/app/actions/getTemplateKomas";
import getTemplateTimetables from "@/app/actions/getTemplateTimetables";
import getUniversities from "@/app/actions/getUniversities";
import CreateTemplateTimetable from "@/app/components/CreateTemplateTimetable";

type jikanwariType = {
  id: string;
  jikan: { start: string; end: string }[];
  doniti: number[];
  userId?: string;
  uniName?: string;
};

type jikanwariTemp = {
  id: string;
  jikan: { start: string; end: string }[];
  uniName?: string;
};

const jikanwari: jikanwariType = {
  id: "hoge",
  jikan: [{ start: "9:00", end: "10:50" }],
  doniti: [1, 1],
  userId: "uma",
};

type koma = {
  id: string;
  name?: string;
  day: string;
  time: string;
  jikanwariId: string;
  userId: string;
};

// jikanwari info? 時間割情報、コマ情報を持たない、時間だけのデータ

export default async function Home() {
  const universities = await getUniversities();
  const currentUser = await getCurrentUser();
  const templateTimetables = await getTemplateTimetables();
  const templateKomas = await getTemplateKomas();

  if (!currentUser) return null;
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
