"use client";
import { TimetableWithAll } from "@/types/timetable";
import { CurrentUserType, UserWithAll } from "@/types/user";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, IconButton } from "@material-tailwind/react";
import { Koma } from "@prisma/client";
import Image from "next/image";
import { useEffect, useState } from "react";

const DAY = ["Mon", "Tue", "Wed", "Thu", "Fri"];

export default function Mypage({
  user,
  currentUser,
  timetables,
}: {
  user: UserWithAll;
  currentUser: CurrentUserType;
  timetables: TimetableWithAll[] | undefined;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      setFile(files[0]);
      setPreview(URL.createObjectURL(files[0]));
    }
  };

  const [timetableData, setTimetableData] = useState<boolean[][]>([]);
  const [selectedKoma, setSelectedKoma] = useState<Koma | undefined>();
  const timetable = timetables?.[0];

  const openKoma = (d: number, k: number) => {
    if (!timetable) return;
    setSelectedKoma(
      timetable.komas.filter((koma) => koma.day === d && koma.num === k)[0]
    );
  };

  useEffect(() => {
    if (!timetable) return;
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
  }, [timetable]);

  return (
    <div>
      <div className="flex items-center flex-col my-8">
        <Image
          src={preview ? preview : user.image ? user.image : "/user.png"}
          alt={user.name ? user.name : ""}
          width={180}
          height={180}
          className="rounded-full mb-4 h-[180px] w-[180px] object-cover"
        />
        {/* <input
          name="file"
          type="file"
          accept="image/*"
          onChange={onChangeFile}
        /> */}
        <div className="text-3xl font-bold">{user.name}</div>
      </div>
      <div>
        <div>mail : {user.email}</div>
        <div>uni : {user.university?.name}</div>
      </div>
      <div className="flex w-full gap-2">
        {user.id !== currentUser.id &&
          timetableData.map((day, dayIndex) => (
            <div key={dayIndex} className="flex-1">
              <div className="w-full text-center">{DAY[dayIndex]}</div>
              {day.map((koma: boolean, komaIndex) => (
                <Button
                  key={komaIndex}
                  color={koma ? "pink" : "gray"}
                  className={`rounded-md w-full h-24 mb-2`}
                  onClick={() => openKoma(dayIndex, komaIndex)}
                  variant={koma ? "gradient" : "outlined"}
                  // disabled={!koma}
                >
                  {" "}
                </Button>
              ))}
            </div>
          ))}
      </div>
      {selectedKoma && (
        <div className="fixed h-screen w-full max-w-[450px] top-0 left-0 z-50">
          <div
            className="fixed h-screen w-full top-0 left-0 bg-gray-400 opacity-50"
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
