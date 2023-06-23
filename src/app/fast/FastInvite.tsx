"use client";
import { FastGroupWithAll } from "@/types/fastGroup";
import { FastTimetableWithKomas } from "@/types/fastTimetable";
import { KomaWithAll } from "@/types/koma";
import { Button } from "@material-tailwind/react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const DAY = ["Mon", "Tue", "Wed", "Thu", "Fri"];
const OPACITY = {
  10: "opacity-10",
  20: "opacity-20",
  30: "opacity-30",
  40: "opacity-40",
  50: "opacity-50",
  60: "opacity-60",
  70: "opacity-70",
  80: "opacity-80",
  90: "opacity-90",
  100: "opacity-100",
};

const generateOpacity = (
  num: 10 | 20 | 30 | 40 | 50 | 60 | 70 | 80 | 90 | 100
) => {
  return OPACITY[num];
};

export default function FastInvite({
  fastGroup,
  fastTimetables,
  fastKomas,
}: {
  fastGroup: FastGroupWithAll;
  fastTimetables: FastTimetableWithKomas[];
  fastKomas: KomaWithAll[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [timetableData, setTimetableData] = useState<KomaWithAll[][][]>([]);

  useEffect(() => {
    if (!fastKomas) return;

    const temp: KomaWithAll[][][] = [...Array(5)].map((_, dayIndex) =>
      [...Array(5)].map((_, komaIndex) => {
        const koma = fastKomas.filter(
          (koma) => koma.day === dayIndex && koma.num === komaIndex
        );
        return koma;
      })
    );
    setTimetableData(temp);
  }, [fastKomas]);

  return (
    <div>
      <div className="font-bold text-xl my-4">
        あなたは{fastGroup.name}に招待されました！
      </div>
      <div className="font-semibold">
        現在
        <span className="text-secondary underline underline-offset-2">
          {fastTimetables.length}人
        </span>
        が回答しています！
      </div>
      <div className="flex gap-4 my-4">
        <button
          className="btn btn-outline w-[30%]"
          onClick={() => router.push(`${pathname.replace("invite", "")}`)}
        >
          回答済み
        </button>
        <button
          className="btn btn-primary flex-1"
          onClick={() => router.push(`${pathname.replace("invite", "form")}`)}
        >
          時間割を回答する
        </button>
      </div>
      <div className="flex w-full gap-2 my-8">
        {timetableData.map((day, dayIndex) => (
          <div key={dayIndex} className={`flex-1`}>
            <div className={`w-full text-center mb-1`}>{DAY[dayIndex]}</div>
            {day.map((koma, komaIndex) => {
              const num =
                Math.round(
                  ((koma.filter((f) => f.aki).length / fastTimetables.length) *
                    100) /
                    10
                ) * 10;
              const opacity = generateOpacity(
                num as 10 | 20 | 30 | 40 | 50 | 60 | 70 | 80 | 90 | 100
              );
              return (
                <Button
                  key={komaIndex}
                  color="pink"
                  className={`${opacity} p-2 rounded-md w-full h-24 mb-2`}
                  variant={
                    koma.filter((k) => k.aki).length > 0
                      ? "gradient"
                      : "outlined"
                  }
                >
                  <div className="mb-1">
                    <span className="text-xl">
                      {koma.filter((f) => f.aki).length}
                    </span>
                    /{fastTimetables.length}
                  </div>
                  <div className="flex overflow-auto items-center -space-x-2">
                    {koma.map(
                      (k, i) =>
                        i < 5 &&
                        k.aki && (
                          <Image
                            src={k.user?.image ? k.user.image : "/user.png"}
                            alt={k.user?.name ? k.user?.name : ""}
                            width={20}
                            height={20}
                            className="rounded-full border-2 border-white hover:z-10 focus:z-10 bg-white"
                            key={k.id}
                          />
                        )
                    )}
                  </div>
                </Button>
              );
            })}
          </div>
        ))}
      </div>

      <div className="font-semibold">回答済みの人たち…</div>
      <ul className="menu p-0">
        {fastTimetables.map((timetable) => {
          const data = [...Array(5)].map((_, dayIndex) =>
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
          );
          return (
            <li key={timetable.id} className="w-lg">
              <details>
                <summary>{timetable.name}</summary>
                <ul className="my-2">
                  <div className="flex w-full gap-2">
                    {data.map((day, dayIndex) => (
                      <div key={dayIndex} className="flex-1">
                        <div className="w-full text-center">
                          {DAY[dayIndex]}
                        </div>
                        {day.map((koma: boolean, komaIndex) => (
                          <Button
                            key={komaIndex}
                            color={koma ? "pink" : "gray"}
                            className={`rounded-md w-full h-24 mb-2 block`}
                            variant={koma ? "gradient" : "outlined"}
                          >
                            {" "}
                          </Button>
                        ))}
                      </div>
                    ))}
                  </div>
                </ul>
              </details>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
