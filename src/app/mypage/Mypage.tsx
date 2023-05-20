"use client";
import { TimetableWithAll } from "@/types/timetable";
import { useRouter } from "next/navigation";
import { Button, IconButton, Tooltip } from "../components/MaterialReact";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export default function Mypage({
  timetables,
}: {
  timetables: TimetableWithAll[] | undefined;
}) {
  const router = useRouter();
  if (!timetables) return;
  const timetable = timetables[0];
  return (
    <div>
      <div className="flex justify-between items-center text-lg font-bold border-l-[4px] p-2 mb-4">
        <div className="flex-1">{timetable.name}</div>
        <Button
          size="sm"
          className="text-xs"
          onClick={() => router.push("/createTimetable")}
        >
          時間割を作る
          <FontAwesomeIcon icon={faPlus} className="ml-3" />
        </Button>
      </div>
      <div key={timetable.id}>
        <div>{timetable.name}</div>
        {timetable.komas.map((koma) => (
          <div key={koma.id}>
            <div>
              {koma.day} {koma.num}, {koma.startH}:{koma.startM}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
