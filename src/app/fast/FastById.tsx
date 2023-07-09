"use client";

import { FastGroupWithAll } from "@/types/fastGroup";
import { FastTimetableWithKomas } from "@/types/fastTimetable";
import { KomaWithAll } from "@/types/koma";
import { Button } from "@material-tailwind/react";
import { useState, useEffect, RefObject } from "react";
import Image from "next/image";
import {
  faArrowUpFromBracket,
  faClipboard,
  faDownload,
  faClose,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { usePathname } from "next/navigation";
import { useQRCode } from "react-qrcodes";

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
export default function Hoge({
  fastGroup,
  fastTimetables,
  fastKomas,
  baseUrl,
}: {
  fastGroup: FastGroupWithAll;
  fastTimetables: FastTimetableWithKomas[];
  fastKomas: KomaWithAll[];
  baseUrl: string;
}) {
  const [shareIsOpen, setShareIsOpen] = useState<boolean>(false);
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

  const path = usePathname();
  const inviteUrl = `${baseUrl}${path}/invite`;
  // console.log(inviteUrl);
  // const [inputRef] = shareIsOpen
  //   ? useQRCode({
  //       text: inviteUrl,
  //       options: {
  //         level: "H",
  //         margin: 3,
  //         scale: 1,
  //         width: 350,
  //       },
  //     })
  //   : [];

  const copyTextToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(
      function () {
        console.log("Async: Copying to clipboard was successful!");
      },
      function (err) {
        console.error("Async: Could not copy text: ", err);
      }
    );
  };

  // const saveCanvas = () => {
  //   const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  //   const a = document.createElement("a");
  //   if (!canvas) return;
  //   a.href = canvas.toDataURL("image/jpeg", 0.85);
  //   a.download = "download.jpg";
  //   a.click();
  // };

  return (
    <div className="relative">
      <div className="flex items-center justify-between">
        <div className="font-bold text-xl my-4 border-l-4 pl-4 py-2 border-primary">{fastGroup.name}</div>
        <button
          className="btn btn-primary"
          onClick={() => setShareIsOpen(!shareIsOpen)}
        >
          共有
          <FontAwesomeIcon icon={faArrowUpFromBracket} size="lg" />
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
                            className={`rounded-md w-full h-14 mb-2 block`}
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
      {shareIsOpen && (
        <div className="absolute w-9/12 h-6/4 bg-white drop-shadow-xl rounded-xl p-4 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
          <div className="flex items-center justify-between">
            <div className="font-semibold text-xl">共有</div>
            <button
              className="btn btn-outline"
              onClick={() => setShareIsOpen(false)}
            >
              <FontAwesomeIcon icon={faClose} size="lg" />
            </button>
          </div>
          {/* <div className="flex flex-col items-center my-8">
              <div className="font-bold text-4xl">{fastGroup.name}</div>
              <canvas
                id="canvas"
                ref={inputRef as unknown as RefObject<HTMLCanvasElement>}
              />
              <button className="btn btn-lg btn-primary" onClick={saveCanvas}>
                DownLoad
                <FontAwesomeIcon icon={faDownload} size="lg" />
              </button>
            </div> */}
          <div className="flex items-center justify-center gap-4 my-4">
            <div className="font-bold text-md">URLで共有する</div>
            <button
              className="btn btn-secondary"
              onClick={() => copyTextToClipboard(inviteUrl)}
            >
              URLをコピー
              <FontAwesomeIcon icon={faClipboard} size="lg" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
