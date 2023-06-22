"use client";

import { FastGroupWithAll } from "@/types/fastGroup";
import { FastTimetableWithKomas } from "@/types/fastTimetable";
import { usePathname } from "next/navigation";

export default function First({
  fastGroup,
  fastTimetables,
}: {
  fastGroup: FastGroupWithAll;
  fastTimetables: FastTimetableWithKomas[];
}) {
  const path = usePathname();
  return (
    <>
      <div className="text-2xl font-bold text-center">
        グループが作成されました！<br></br>早速、友人を招待しましょう！！
      </div>
      <div>
        url:
        <a
          href={`http://localhost:3000/${path}/invite`}
        >{`http://localhost:3000/${path}/invite`}</a>
      </div>
    </>
  );
}
