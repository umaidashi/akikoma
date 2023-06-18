"use client";

import { FastGroupWithAll } from "@/types/fastGroup";
import { FastTimetableWithKomas } from "@/types/fastTimetable";

export default function First({
  fastGroup,
  fastTimetables,
}: {
  fastGroup: FastGroupWithAll;
  fastTimetables: FastTimetableWithKomas[];
}) {
  return (
    <div className="text-2xl font-bold text-center">
      グループが作成されました！<br></br>早速、友人を招待しましょう！！
    </div>
  );
}
