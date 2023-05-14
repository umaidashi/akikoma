// "use client"

import Form from "./components/Form";
import getUniversities from "./actions/getUniversities";

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

  return (
    <>
      <div>
        <h1>akikoma</h1>
        {universities.universities && (
          <Form universities={universities.universities} />
        )}
      </div>
    </>
  );
}
