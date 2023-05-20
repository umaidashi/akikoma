"use client";
import { TimetableWithAll } from "@/types/timetable";
import { useRouter } from "next/navigation";
import { Button, IconButton } from "../components/MaterialReact";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faClose } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { Koma } from "@prisma/client";

const DAY = ["Mon", "Tue", "Wed", "Thu", "Fri"];

export default function Mypage({
  timetables,
}: {
  timetables: TimetableWithAll[] | undefined;
}) {
  const router = useRouter();
  const timetable = timetables?.[0];

  const [timetableData, setTimetableData] = useState<boolean[][]>([]);
  const [selectedKoma, setSelectedKoma] = useState<Koma | undefined>();

  if (!timetable) return <NoTimetable />;

  useEffect(() => {
    setTimetableData(
      [...Array(5)].map((_, dayIndex) =>
        [...Array(5)].map((_, komaIndex) => {
          const koma = timetable.komas.filter(
            (koma) => koma.day === dayIndex && koma.num === komaIndex
          );
          if (!koma[0].aki) {
            return true;
          } else {
            return false;
          }
        })
      )
    );
  }, []);

  const openKoma = (d: number, k: number) => {
    setSelectedKoma(
      timetable.komas.filter((koma) => koma.day === d && koma.num === k)[0]
    );
  };

  return (
    <div>
      <div className="flex justify-between items-center text-lg font-bold border-l-[4px] p-2 mb-4">
        <div className="flex-1">
          {timetable.name ? timetable.name : "no title"}
        </div>
        <Button
          size="sm"
          className="text-xs"
          color="pink"
          variant="text"
          onClick={() => router.push("/createTimetable")}
        >
          時間割を作る
          <FontAwesomeIcon icon={faPlus} className="ml-3" size="sm" />
        </Button>
      </div>
      <div className="flex w-full gap-2">
        {timetableData.map((day, dayIndex) => (
          <div key={dayIndex} className="flex-1">
            <div className="w-full text-center">{DAY[dayIndex]}</div>
            {day.map((koma: boolean, komaIndex) => (
              <Button
                key={komaIndex}
                color={koma ? "pink" : "gray"}
                className={`rounded-md w-full h-24 mb-2`}
                onClick={() => openKoma(dayIndex, komaIndex)}
                variant={koma ? "gradient" : "outlined"}
                children={""}
                // disabled={!koma}
              ></Button>
            ))}
          </div>
        ))}
      </div>
      {selectedKoma && (
        <div className="fixed h-screen w-full max-w-[450px] top-0 left-0 z-50">
          <div
            className="fixed h-screen w-full top-0 left-0 bg-white opacity-50"
            onClick={() => setSelectedKoma(undefined)}
          ></div>
          <div className="fixed w-full h-[65vh] bg-white bottom-0 left-0 -z-auto rounded-t-3xl p-8">
            <div className="flex justify-between items-center text-lg font-bold border-l-[4px] px-2 mb-4">
              {selectedKoma.name ? selectedKoma.name : "no title"}
              <IconButton
                color="gray"
                variant="outlined"
                onClick={() => setSelectedKoma(undefined)}
              >
                <FontAwesomeIcon icon={faClose} size="xl" />
              </IconButton>
            </div>
            <div>
              {DAY[selectedKoma.day]} {selectedKoma.num + 1}限
            </div>
            <div>
              {selectedKoma.startH}:{selectedKoma.startM} ~ {selectedKoma.endH}:
              {selectedKoma.endM}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function NoTimetable() {
  const router = useRouter();

  return (
    <div>
      <div className="flex justify-between items-center text-lg font-bold border-l-[4px] p-2 mb-4">
        <div className="flex-1">
          まだ時間割がありません。<br></br>時間割を作成して下さい
        </div>
      </div>
      <Button
        size="lg"
        className="text-md"
        color="pink"
        variant="gradient"
        fullWidth={true}
        onClick={() => router.push("/createTimetable")}
      >
        時間割を作る
        <FontAwesomeIcon icon={faPlus} className="ml-3" size="sm" />
      </Button>
    </div>
  );
}
