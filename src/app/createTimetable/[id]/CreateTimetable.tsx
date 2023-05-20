"use client";

import { TemplateTimetableWithAll } from "@/types/templateTimetables";
import React from "react";
import { useEffect, useState } from "react";
import { Button, Input } from "../../components/MaterialReact";
import { Prisma } from "@prisma/client";
import axios from "axios";
import { CurrentUserType } from "@/types/user";
import { useRouter } from "next/navigation";

export default function CreateTimetable({
  templateTimetable,
  currentUser,
}: {
  templateTimetable: TemplateTimetableWithAll;
  currentUser: CurrentUserType;
}) {
  const router = useRouter();
  const [timetable, setTimetable] = useState<boolean[][]>([]);
  const [timetableName, setTimetableName] = useState<string>("");

  useEffect(() => {
    setTimetable(
      [...Array(5)].map((_) =>
        [...Array(templateTimetable.templateKoma.length)].map((_) => false)
      )
    );
  }, [templateTimetable]);

  const toggleKoma = (dayIndex: number, komaIndex: number) => {
    setTimetable((prev) =>
      prev.map((day, i) =>
        i === dayIndex
          ? day.map((koma, i) => (i === komaIndex ? !koma : koma))
          : day
      )
    );
  };

  const onSubmit = async () => {
    const createdTimetable: { data: { id: string } } = await axios.post(
      "/api/timetable",
      {
        userId: currentUser.id,
        name: timetableName,
        templateTimetableId: templateTimetable.id,
      }
    );

    const temp: Prisma.KomaCreateArgs[] = [];
    timetable.forEach((day, dayIndex) => {
      day.forEach((koma, komaIndex) => {
        const tempKoma = templateTimetable.templateKoma[komaIndex];
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
            timetableId: createdTimetable.data.id,
            userId: currentUser.id,
          },
        });
      });
    });

    temp.map((t) => {
      axios.post("/api/koma", {
        ...t,
      });
    });
    router.refresh()
    router.push("/mypage");
  };

  const onChangeTimetableName = (value: string) => {
    setTimetableName(value);
  };

  return (
    <div>
      <div>
        <div className="text-lg font-bold border-l-[4px] p-2 mb-4">
          あなたの時間割を教えてください
        </div>
        <div className="my-2">
          <Input
            label="timetable name"
            value={timetableName}
            onChange={(e) => onChangeTimetableName(e.target.value)}
          />
        </div>
        <div className="flex w-full gap-2">
          <div>
            {templateTimetable.templateKoma.map((koma) => (
              <div
                key={koma.id}
                className="flex flex-col  justify-center text-center h-20 mb-2"
              >
                <div className="text-md">{koma.name}</div>
                <div className="text-xs text-gray-400 leading-none">
                  {koma.startH}:{koma.startM}
                  <br />~<br />
                  {koma.endH}:{koma.endM}
                </div>
              </div>
            ))}
          </div>
          {timetable.map((day, dayIndex) => (
            <div key={dayIndex} className="flex-1">
              {day.map((koma, komaIndex) => (
                <Button
                  key={komaIndex}
                  color={koma ? "pink" : "gray"}
                  className={`rounded-md w-full h-20 mb-2`}
                  onClick={() => toggleKoma(dayIndex, komaIndex)}
                  variant={koma ? "gradient" : "outlined"}
                  children={""}
                ></Button>
              ))}
            </div>
          ))}
        </div>
        <Button
          fullWidth
          color="pink"
          className="mt-3 py-4"
          disabled={false}
          onClick={onSubmit}
        >
          登録する
        </Button>
      </div>
    </div>
  );
}
