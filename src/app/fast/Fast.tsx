"use client";

import { TemplateTimetableWithAll } from "@/types/templateTimetables";
import { Button } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import createFastGroup from "../actions/createFastGroup";
import createFastTimetable from "../actions/createFastTimetable";
import Loading from "../loading";
import { useRouter } from "next/navigation";

export default function Fast({
  templateTimetables,
}: {
  templateTimetables: TemplateTimetableWithAll[];
}) {
  const router = useRouter();

  const [step, setStep] = useState<number>(0);
  const [togglePassword, setTogglePassword] = useState<boolean>(false);
  const [groupName, setGroupName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [selectTemplate, setSelectTemplate] =
    useState<TemplateTimetableWithAll | null>(null);
  const [timetable, setTimetable] = useState<boolean[][]>([]);
  const [userName, setUserName] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const STEP = [
    "グループ名を入力",
    "時間割テンプレートを選択",
    "自分の時間割を入力",
    "確認",
    "グループを作成する",
  ];

  const validate = (selectedStep?: number) => {
    switch (selectedStep ? selectedStep : step) {
      case 0:
        return groupName
          ? togglePassword
            ? password
              ? true
              : false
            : true
          : false;
      case 1:
        return !!selectTemplate;
      case 2:
        return !!userName;
      case 3:
        return true;
    }
  };

  useEffect(() => {
    if (!selectTemplate) return;
    setTimetable(
      [...Array(5)].map((_) =>
        [...Array(selectTemplate.templateKoma.length)].map((_) => false)
      )
    );
  }, [selectTemplate]);

  const toggleKoma = (dayIndex: number, komaIndex: number) => {
    setTimetable((prev) =>
      prev.map((day, i) =>
        i === dayIndex
          ? day.map((koma, i) => (i === komaIndex ? !koma : koma))
          : day
      )
    );
  };

  const nextStep = async (num: number) => {
    if (num < 4) {
      setStep(num);
    } else {
      setIsLoading(true);
      try {
        if (!selectTemplate) return;
        const createdFastGroup = await createFastGroup({
          name: groupName,
          password: password,
          templateTimetableId: selectTemplate.id,
        });
        if (!createdFastGroup) return;
        const createdFastTimetable = await createFastTimetable({
          name: userName,
          fastGroupId: createdFastGroup.id,
          timetable: timetable,
          template: selectTemplate,
        });
        router.push(`/fast/${createdFastGroup.id}/?first=true`);
      } catch (e) {
        console.log(e);
      }
    }
  };

  templateTimetables.map((templateTimetable) => {
    templateTimetable.templateKoma.sort((a, b) => {
      if (`${a.startH}:${a.startM}` < `${b.startH}:${b.startM}`) {
        return -1;
      } else if (`${a.startH}:${a.startM}` > `${b.startH}:${b.startM}`) {
        return 1;
      } else {
        return 0;
      }
    });
  });

  if (isLoading) return <Loading />;

  return (
    <>
      <ul className="steps w-full">
        {[...Array(4)].map((_, i) => (
          <li
            key={i}
            className={`step ${step >= i && "step-primary cursor-pointer"}`}
            onClick={() => validate(i) && setStep(i)}
          ></li>
        ))}
      </ul>
      <div className="flex items-center justify-between pl-4 py-1.5 my-2 border-l-4 border-primary">
        <div className="text-xl font-bold ">
          step{step + 1} : {STEP[step]}
        </div>
      </div>

      {step === 0 && (
        <>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text font-bold">グループ名</span>
            </label>
            <input
              type="text"
              placeholder="Type here"
              required
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              className="input input-bordered w-full ml-1"
            />
            <label className="label cursor-pointer mt-3">
              <span className="label-text font-bold">パスワードを設定する</span>
              <input
                type="checkbox"
                className="toggle toggle-primary"
                checked={togglePassword}
                onChange={() => setTogglePassword(!togglePassword)}
              />
            </label>
            {togglePassword && (
              <div className="ml-4">
                <label className="label">
                  <span className="label-text font-bold">パスワード</span>
                </label>
                <input
                  type="password"
                  placeholder="password here"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input input-sm input-bordered w-full ml-1"
                />
              </div>
            )}
          </div>
        </>
      )}

      {step === 1 && (
        <>
          <div className="my-2 font-bold text-lg">
            {selectTemplate && selectTemplate.name}
          </div>
          <ul className="menu bg-base-200 rounded-box">
            {/* <button className="btn btn-sm btn-secondary">新しいテンプレートを作成</button> */}
            {templateTimetables &&
              templateTimetables.map((templateTimetable) => (
                <li key={templateTimetable.id}>
                  <details open={!selectTemplate ? true : false}>
                    <summary className="font-bold text-md">
                      {templateTimetable.name
                        ? templateTimetable.name
                        : "No Name"}
                    </summary>
                    <ul className="mb-4">
                      <div className="py-1">
                        {templateTimetable.templateKoma.map((tempKoma) => (
                          <div key={tempKoma.id} className="p-1">
                            {tempKoma.name} {tempKoma.startH}:{tempKoma.startM}~
                            {tempKoma.endH}:{tempKoma.endM}
                          </div>
                        ))}
                      </div>
                      <li
                        className={`btn btn-sm btn-primary w-full ${
                          selectTemplate &&
                          selectTemplate.id === templateTimetable.id &&
                          "btn-error"
                        }`}
                        onClick={() =>
                          selectTemplate &&
                          selectTemplate.id === templateTimetable.id
                            ? setSelectTemplate(null)
                            : setSelectTemplate(templateTimetable)
                        }
                      >
                        <a>
                          {selectTemplate &&
                          selectTemplate.id === templateTimetable.id
                            ? "取り消す"
                            : "この時間割を使用する"}
                        </a>
                      </li>
                    </ul>
                  </details>
                </li>
              ))}
          </ul>
        </>
      )}

      {step === 2 && selectTemplate && (
        <>
          <div className="form-control w-full max-w-xs mb-4">
            <label className="label">
              <span className="label-text font-bold">あなたの名前</span>
            </label>
            <input
              type="text"
              placeholder="Type here"
              required
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="input input-bordered w-full ml-1"
            />
          </div>
          <div className="flex w-full gap-2">
            <div>
              {selectTemplate.templateKoma.map((koma) => (
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
        </>
      )}

      {step === 3 && (
        <>
          <div className="form-control w-full">
            <label className="label mt-2">
              <span className="label-text font-bold">グループ名</span>
            </label>
            <input
              type="text"
              placeholder="Type here"
              value={groupName}
              disabled
              className="input input-ghost w-full ml-1"
            />
            {password && (
              <div className="form-control w-full max-w-xs">
                <label className="label mt-2">
                  <span className="label-text font-bold">パスワード</span>
                </label>
                <input
                  type="password"
                  placeholder="Type here"
                  value={password}
                  disabled
                  className="input input-ghost w-full ml-1"
                />
              </div>
            )}

            <label className="label mt-2">
              <span className="label-text font-bold">時間割テンプレート</span>
            </label>
            <ul className="menu rounded-box">
              <li>
                <details>
                  <summary>{selectTemplate && selectTemplate.name}</summary>
                  <ul className="mb-4">
                    <div className="py-1">
                      {selectTemplate &&
                        selectTemplate.templateKoma.map((tempKoma) => (
                          <div key={tempKoma.id} className="p-1">
                            {tempKoma.name} {tempKoma.startH}:{tempKoma.startM}~
                            {tempKoma.endH}:{tempKoma.endM}
                          </div>
                        ))}
                    </div>
                  </ul>
                </details>
              </li>
            </ul>
            <label className="label mt-2">
              <span className="label-text font-bold">あなたの名前</span>
            </label>
            <input
              type="text"
              placeholder="Type here"
              value={userName}
              disabled
              className="input input-ghost w-full ml-1"
            />
            <label className="label mt-2">
              <span className="label-text font-bold">あなたの時間割</span>
            </label>
            <div className="flex w-full gap-2">
              <div>
                {selectTemplate &&
                  selectTemplate.templateKoma.map((koma) => (
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
                      disabled
                      color={koma ? "pink" : "gray"}
                      className={`rounded-md w-full h-20 mb-2`}
                      variant={koma ? "gradient" : "outlined"}
                    >
                      {" "}
                    </Button>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      <button
        className="btn btn-primary w-full mt-8"
        onClick={() => nextStep(step + 1)}
        disabled={!validate()}
      >
        Next : {STEP[step + 1]}
      </button>
    </>
  );
}
