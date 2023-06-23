"use client";
import { FastGroupWithAll } from "@/types/fastGroup";
import { FastTimetableWithKomas } from "@/types/fastTimetable";
import { TemplateTimetableWithAll } from "@/types/templateTimetables";
import { Button } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import createFastTimetable from "../actions/createFastTimetable";
import { useRouter } from "next/navigation";
import Loading from "../loading";

export default function FastForm({
  fastGroup,
  fastTimetables,
  fastTemplate,
}: {
  fastGroup: FastGroupWithAll;
  fastTimetables: FastTimetableWithKomas[];
  fastTemplate: TemplateTimetableWithAll;
}) {
  const router = useRouter();
  const [timetable, setTimetable] = useState<boolean[][]>([]);
  const [userName, setUserName] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!fastTemplate) return;
    setTimetable(
      [...Array(5)].map((_) =>
        [...Array(fastTemplate.templateKoma.length)].map((_) => false)
      )
    );
  }, [fastTemplate]);

  const toggleKoma = (dayIndex: number, komaIndex: number) => {
    setTimetable((prev) =>
      prev.map((day, i) =>
        i === dayIndex
          ? day.map((koma, i) => (i === komaIndex ? !koma : koma))
          : day
      )
    );
  };

  const submit = async () => {
    setIsLoading(true);
    try {
      const createdFastTimetable = await createFastTimetable({
        name: userName,
        fastGroupId: fastGroup.id,
        timetable: timetable,
        template: fastTemplate,
      });
      router.push(`/fast/${fastGroup.id}`);
    } catch (e) {
      console.log(e);
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div>
      <div className="font-semibold text-lg my-4">
        あなたの時間割を登録してください
      </div>
      <div className="form-control w-full mb-4">
        <label className="label">
          <span className="label-text font-bold">あなたの名前</span>
        </label>
        <input
          type="text"
          placeholder="Type here"
          required
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="input input-bordered w-auto ml-1"
        />
      </div>
      <div className="flex w-full gap-2">
        <div>
          {fastTemplate.templateKoma.map((koma) => (
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
              >
                {" "}
              </Button>
            ))}
          </div>
        ))}
      </div>
      <button className="btn btn-primary" onClick={submit}>
        登録する
      </button>
    </div>
  );
}
