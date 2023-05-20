"use client";
import { TimetableWithAll } from "@/types/timetable";
import { UserWithAll } from "@/types/user";
import { Prisma, User } from "@prisma/client";
import { time } from "console";
import Image from "next/image";
import { useState } from "react";

export default function Mypage({
  timetables,
}: {
  timetables: TimetableWithAll[] | undefined;
}) {
  return (
    <div>
      {timetables?.map((timetable) => (
        <div>
          <div>{timetable.name}</div>
          <div>{timetable.id}</div>
          {timetable.komas.map((koma) => (
            <div>
              <div>
                {koma.day}, {koma.startH}:{koma.startM}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
