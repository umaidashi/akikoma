"use client";
import { TemplateKomaWithAll } from "@/types/templateKoma";
import { TemplateTimetableWithAll } from "@/types/templateTimetables";
import { CurrentUserType } from "@/types/user";
import {
  TemplateKoma,
  TemplateTimetable,
  University,
  User,
  Prisma,
} from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CreateTemplateTimetable({
  universities,
  currentUser,
  templateTimetables,
  templateKomas,
}: {
  universities: University[] | undefined;
  currentUser: CurrentUserType | undefined | null;
  templateTimetables: TemplateTimetableWithAll[] | undefined;
  templateKomas: TemplateKomaWithAll[] | undefined;
}) {
  const router = useRouter();

  const [selectedUni, setSelectedUni] = useState<University | undefined>(
    undefined
  );
  const [selectedTemp, setSelectedTemp] = useState<
    TemplateTimetableWithAll | undefined
  >(undefined);

  const [university, setUniversity] = useState("");
  const [templateTimetableName, setTemplateTimetableName] = useState("");
  const [templateTimetableKoma, setTemplateTimetableKoma] = useState<
    Prisma.TemplateKomaCreateInput[]
  >([]);
  const addUniversity = async () => {
    axios
      .post("/api/university", { name: university })
      .then(() => {
        setUniversity("");
      })
      .catch((error) => {
        alert(error);
      })
      .finally(() => {
        router.refresh();
      });
  };

  const deleteUniversity = async (id: string) => {
    axios
      .delete(`/api/university/${id}`)
      .catch((error) => {
        alert(error);
      })
      .finally(() => {
        router.refresh();
      });
  };

  const changeUniversity = (value: string) => {
    setUniversity(value);
  };

  const selectUniversity = (university: University) => {
    setSelectedUni(university);
  };

  const changeTemplateTimetableName = (value: string) => {
    setTemplateTimetableName(value);
  };

  const addTemplateTimetable = () => {
    if (!currentUser?.id) return;
    axios
      .post("/api/template", {
        name: templateTimetableName,
        userId: currentUser?.id,
        uniId: selectedUni?.id,
      })
      .then(() => {
        setTemplateTimetableName("");
      })
      .catch((error) => {
        alert(error);
      })
      .finally(() => {
        router.refresh();
      });
  };

  const selectTemp = (temp: TemplateTimetableWithAll) => {
    setSelectedTemp(temp);
    setTemplateTimetableKoma(
      [...Array(5)].map((_, i) => {
        return {
          name: `${i + 1}限`,
          startH: "00",
          startM: "00",
          endH: "00",
          endM: "00",
          templateTimetable:
            temp as Prisma.TemplateTimetableCreateNestedOneWithoutTemplateKomaInput,
        };
      })
    );
  };

  const addKoma = () => {
    if (selectedTemp === undefined) return;
    const newTemplateKoma: Prisma.TemplateKomaCreateInput = {
      name: "",
      startH: "00",
      startM: "00",
      endH: "00",
      endM: "00",
      templateTimetable:
        selectedTemp as Prisma.TemplateTimetableCreateNestedOneWithoutTemplateKomaInput,
    };
    setTemplateTimetableKoma([...templateTimetableKoma, newTemplateKoma]);
  };

  const onChangeKoma = (value: string, index: number, flg: string) => {
    const result: Prisma.TemplateKomaCreateInput[] = templateTimetableKoma.map(
      (tk, i) => {
        if (index === i) {
          return {
            name: flg === "name" ? value : tk.name,
            startH: flg === "startH" ? value : tk.startH,
            startM: flg === "startM" ? value : tk.startM,
            endH: flg === "endH" ? value : tk.endH,
            endM: flg === "endM" ? value : tk.endM,
            templateTimetable: tk.templateTimetable,
          };
        } else {
          return tk;
        }
      }
    );
    setTemplateTimetableKoma(result);
  };

  const hourOption = [...Array(24)].map((_, h) => `00${h}`.slice(-2));
  const minuteOption = [...Array(60)]
    .map((_, m) => {
      return m === 0 || m % 5 === 0 ? `00${m}`.slice(-2) : null;
    })
    .filter((f) => f !== null) as string[];

  const addKomas = () => {
    templateTimetableKoma.forEach((koma) => {
      axios
        .post("/api/templateKoma", {
          name: koma.name,
          startH: koma.startH,
          startM: koma.startM,
          endH: koma.endH,
          endM: koma.endM,
          templateTimetable: koma.templateTimetable,
        })
        .catch((error) => {
          alert(error);
        });
    });
  };

  if (!currentUser) {
    router.push("/signup");
    return null;
  }

  return (
    <div>
      <div>大学を選ぶ</div>

      <input
        type="text"
        value={university}
        onChange={(e) => changeUniversity(e.target.value)}
        className="border"
      />
      <button onClick={addUniversity}>addUni</button>

      {universities &&
        universities.map((university) => (
          <div key={university.id} className="flex">
            <div>{university.name}</div>
            <button onClick={() => selectUniversity(university)}>select</button>
            <button onClick={() => deleteUniversity(university.id)}>
              delete
            </button>
          </div>
        ))}

      <div className="mt-4">時間割を作る</div>
      {selectedUni && (
        <div>
          <div>{selectedUni.name}</div>
          <input
            type="text"
            value={templateTimetableName}
            onChange={(e) => changeTemplateTimetableName(e.target.value)}
            className="border"
          />
          <button onClick={addTemplateTimetable}>時間割を作る</button>
          {templateTimetables &&
            templateTimetables.map((templateTimetable) => (
              <div key={templateTimetable.id} className="flex">
                <div>{templateTimetable.name}</div>
                <button onClick={() => selectTemp(templateTimetable)}>
                  select
                </button>
                <button onClick={() => deleteUniversity(templateTimetable.id)}>
                  delete
                </button>
              </div>
            ))}
        </div>
      )}

      {selectedTemp && (
        <div className="mt-4">
          <div>{selectedTemp.name}</div>
          {/* {templateKomas &&
            templateKomas.map((tk) => (
              <div key={tk.id} className="flex">
                <div>{tk.name}</div>
                <div>
                  {tk.startH}:{tk.startM} ~ {tk.endH}:{tk.endM}
                </div>
              </div>
            ))} */}
          <button onClick={addKoma}>add Koma</button>
          {templateTimetableKoma &&
            templateTimetableKoma.map((tk, i) => (
              <div key={i}>
                <input
                  type="text"
                  value={tk.name as string}
                  onChange={(e) => onChangeKoma(e.target.value, i, "name")}
                  className="border"
                />
                <div className="flex">
                  <div>
                    <select
                      name="hour"
                      id="hour"
                      onChange={(e) =>
                        onChangeKoma(e.target.value, i, "startH")
                      }
                    >
                      {hourOption.map((h) => {
                        return (
                          <option
                            value={h}
                            key={h}
                            disabled={
                              tk.startH !== "00" &&
                              tk.endH !== "00" &&
                              Number(tk.endH) < Number(h)
                            }
                          >
                            {h}
                          </option>
                        );
                      })}
                    </select>
                    :
                    <select
                      name="minute"
                      id="minute"
                      onChange={(e) =>
                        onChangeKoma(e.target.value, i, "startM")
                      }
                    >
                      {minuteOption.map((m) => (
                        <option
                          value={m}
                          key={m}
                          disabled={
                            tk.startM !== "00" &&
                            tk.endM !== "00" &&
                            Number(tk.startH) === Number(tk.endH) &&
                            Number(tk.endM) <= Number(m)
                          }
                        >
                          {m}
                        </option>
                      ))}
                    </select>
                  </div>
                  ~
                  <div>
                    <select
                      name="hour"
                      id="hour"
                      onChange={(e) => onChangeKoma(e.target.value, i, "endH")}
                    >
                      {hourOption.map((h) => (
                        <option
                          value={h}
                          key={h}
                          disabled={Number(tk.startH) > Number(h)}
                        >
                          {h}
                        </option>
                      ))}
                    </select>
                    :
                    <select
                      name="minute"
                      id="minute"
                      onChange={(e) => onChangeKoma(e.target.value, i, "endM")}
                    >
                      {minuteOption.map((m) => (
                        <option
                          value={m}
                          key={m}
                          disabled={
                            tk.startM !== "00" &&
                            tk.endM !== "00" &&
                            Number(tk.startH) === Number(tk.endH) &&
                            Number(tk.startM) >= Number(m)
                          }
                        >
                          {m}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <div>{tk.name}</div>
                  <div>
                    {tk.startH}:{tk.startM} ~ {tk.endH}:{tk.endM}
                  </div>
                </div>
              </div>
            ))}
          <button onClick={addKomas}>addKomas</button>
        </div>
      )}
    </div>
  );
}
