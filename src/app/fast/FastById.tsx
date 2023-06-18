"use client";

import { FastGroupWithAll } from "@/types/fastGroup";
import { FastTimetableWithKomas } from "@/types/fastTimetable";
import { FastTimetable, Koma } from "@prisma/client";

export default function FastById({
  first,
  fastGroup,
  fastTimetables,
}: {
  first: boolean;
  fastGroup: FastGroupWithAll;
  fastTimetables: FastTimetableWithKomas[];
}) {
  console.log(first, fastGroup, fastTimetables);
  return (
    <div>
      {first && (
        <div className="text-2xl font-bold text-center">グループが作成されました！！<br></br>早速、友人を招待しましょう！！</div>
      )}
    </div>
  );
}
