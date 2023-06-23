import { TemplateTimetableWithAll } from "@/types/templateTimetables";
import { Prisma } from "@prisma/client";
import axios from "axios";

interface IParams {
  name: string;
  fastGroupId: string;
  timetable: boolean[][];
  template: TemplateTimetableWithAll;
}

export default async function createFastTimetable(params: IParams) {
  try {
    const createdTimetable: { data: { id: string } } = await axios.post(
      "/api/fastTimetable",
      {
        fastGroupId: params.fastGroupId,
        name: params.name,
      }
    );

    const temp: Prisma.KomaCreateArgs[] = [];
    params.timetable.forEach((day, dayIndex) => {
      day.forEach((koma, komaIndex) => {
        const tempKoma = params.template.templateKoma[komaIndex];
        temp.push({
          data: {
            day: dayIndex,
            num: komaIndex,
            aki: !koma,
            name: koma ? "授業" : "空きコマ",
            startH: tempKoma.startH,
            startM: tempKoma.startM,
            endH: tempKoma.endH,
            endM: tempKoma.endM,
            fastTimetableId: createdTimetable.data.id,
          },
        });
      });
    });

    temp.map((t) => {
      axios.post("/api/koma", {
        ...t,
      });
    });
    // return createdFastGroup.data;
  } catch (error) {
    console.log(error);
  }
}
