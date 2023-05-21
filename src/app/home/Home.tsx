"use client";

import { KomaWithAll } from "@/types/koma";
import { FollowingsType } from "@/types/relationships";
import { CurrentUserType } from "@/types/user";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Button,
  IconButton,
  List,
  ListItem,
  ListItemPrefix,
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
  Typography,
} from "../components/MaterialReact";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { TimetableWithAll } from "@/types/timetable";

const DAY = ["Mon", "Tue", "Wed", "Thu", "Fri"];

export default function Home({
  currentUser,
  followings,
  followingsKomas,
  followingsTimetable,
}: {
  currentUser: CurrentUserType;
  followings: FollowingsType[] | undefined;
  followingsKomas?: KomaWithAll[] | undefined | null;
  followingsTimetable?: TimetableWithAll[] | undefined | null;
}) {
  const router = useRouter();

  // const date = new Date();
  // const now =
  //   `00${date.getHours()}`.slice(-2) +
  //   ":" +
  //   `:00${date.getMinutes()}`.slice(-2);
  // const day = date.getDay() - 1;
  const now = "15:00";
  const Day = 1;

  const nowKomas = followingsKomas?.filter((koma) => {
    const start = `${koma.startH}:${koma.startM}`;
    const end = `${koma.endH}:${koma.endM}`;
    if (koma.day === Day && start < now && now < end) {
      return koma;
    }
  });

  const isNowKoma = (koma: KomaWithAll) => {
    const start = `${koma.startH}:${koma.startM}`;
    const end = `${koma.endH}:${koma.endM}`;
    console.log(koma.day === Day && start < now && now < end);
    return koma.day === Day && start < now && now < end;
  };

  const [activeTab, setActiveTab] = useState("aki");

  const [timetableData, setTimetableData] = useState<KomaWithAll[][][]>([]);
  const [selectedKoma, setSelectedKoma] = useState<KomaWithAll[] | undefined>();

  useEffect(() => {
    if (!followingsKomas) return;

    const temp: KomaWithAll[][][] = [...Array(5)].map((_, dayIndex) =>
      [...Array(5)].map((_, komaIndex) => {
        const koma = followingsKomas.filter(
          (koma) => koma.day === dayIndex && koma.num === komaIndex
        );
        return koma;
      })
    );
    setTimetableData(temp);
  }, [followingsKomas]);

  const openKoma = (d: number, k: number) => {
    if (!followingsKomas) return;
    const temp = followingsKomas.filter(
      (koma) => koma.day === d && koma.num === k
    )[0];
    const koma = followingsKomas.filter(
      (k) => k.day === temp.day && k.num === temp.num
    );
    setSelectedKoma(koma);
  };

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

  if (!followingsTimetable) return null;
  return (
    <div>
      <div>
        <div className="flex gap-2 overflow-x-auto">
          {nowKomas?.map((f) => (
            <div key={f.userId} className="min-w-[66px] text-center">
              <div
                className={`rounded-full border p-1 mx-auto max-w-[66px] cursor-pointer ${
                  f.aki
                    ? "border-pink-400 border-[3px]"
                    : "border-gray-400 border-[3px]"
                }`}
                onClick={() => router.push(`/account/${f.userId}`)}
              >
                <Image
                  src={f.user?.image ? f.user.image : "/user.png"}
                  alt={f.user?.name ? f.user?.name : ""}
                  width={52}
                  height={52}
                  className="rounded-full max-w-[52px]"
                />
              </div>
              <div className="text-xs text-gray-700 mt-1">{f.user?.name}</div>
            </div>
          ))}
        </div>
        <hr className="my-3" />
        <div className="flex w-full gap-2">
          {timetableData.map((day, dayIndex) => (
            <div
              key={dayIndex}
              className={`flex-1 ${
                dayIndex === Day && "bg-gray-100 px-2 rounded-md"
              }`}
            >
              <div
                className={`w-full text-center mb-1 ${
                  dayIndex === Day && "text-pink-400 font-bold rounded-md"
                }`}
              >
                {DAY[dayIndex]}
              </div>
              {day.map((koma, komaIndex) => {
                const num =
                  Math.round(
                    ((koma.filter((f) => f.aki).length /
                      followingsTimetable.length) *
                      100) /
                      10
                  ) * 10;
                const opacity = generateOpacity(
                  num as 10 | 20 | 30 | 40 | 50 | 60 | 70 | 80 | 90 | 100
                );
                return (
                  <Button
                    key={komaIndex}
                    color={
                      koma.filter((f) => f.userId === currentUser.id && f.aki)
                        .length > 0
                        ? "pink"
                        : "gray"
                    }
                    className={`${opacity} ${
                      isNowKoma(koma[0]) &&
                      "opacity-100 border-[4px] border-purple-800  drop-shadow-2xl"
                    } p-2 rounded-md w-full h-24 mb-2`}
                    onClick={() => openKoma(dayIndex, komaIndex)}
                    variant={
                      koma.filter((k) => k.aki).length > 0
                        ? "gradient"
                        : "outlined"
                    }
                    // disabled={!koma}
                  >
                    <div className="mb-1">
                      <span className="text-xl">
                        {koma.filter((f) => f.aki).length}
                      </span>
                      /{followingsTimetable.length}
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
      </div>
      {selectedKoma && (
        <div className="fixed h-screen w-full max-w-[450px] top-0 left-0 z-50">
          <div
            className="fixed h-screen w-full top-0 left-0 bg-white opacity-50"
            onClick={() => setSelectedKoma(undefined)}
          ></div>
          <div className="fixed w-full h-[65vh] bg-white bottom-0 left-0 -z-auto rounded-t-3xl p-8">
            <div className="flex justify-between items-center text-lg font-bold border-l-[4px] px-2 mb-4">
              {DAY[selectedKoma[0].day]}曜 {selectedKoma[0].num + 1}限
              <IconButton
                color="gray"
                variant="outlined"
                onClick={() => setSelectedKoma(undefined)}
              >
                <FontAwesomeIcon icon={faClose} size="xl" />
              </IconButton>
            </div>
            <Tabs id="custom-animation" value={activeTab}>
              <TabsHeader
                className="rounded-none border-b border-pink-gray-50 bg-transparent p-0"
                indicatorProps={{
                  className:
                    "bg-transparent border-b-2 border-pink-500 shadow-none rounded-none",
                }}
              >
                <Tab
                  defaultChecked={true}
                  className={`font-bold text-gray-500 text-sm pb-2 ${activeTab === "aki" && "text-pink-500"}`}
                  value={"aki"}
                  onClick={() => setActiveTab("aki")}
                >
                  空き
                </Tab>
                <Tab
                  defaultChecked={false}
                  className={`font-bold text-gray-500 text-sm pb-2 ${activeTab === "jugyo" && "text-pink-500"}`}
                  value={"jugyo"}
                  onClick={() => setActiveTab("jugyo")}

                >
                  授業
                </Tab>
              </TabsHeader>
              <TabsBody
                animate={{
                  initial: { y: 250 },
                  mount: { y: 0 },
                  unmount: { y: 250 },
                }}
              >
                <TabPanel value={"aki"}>
                  <List>
                    {selectedKoma && selectedKoma?.length > 0 ? (
                      selectedKoma?.map((f) => {
                        if (!f.aki) return null;
                        return (
                          <ListItem key={f.user.id} className="justify-between">
                            <div className="flex">
                              <ListItemPrefix>
                                <Image
                                  src={
                                    f.user?.image ? f.user.image : "/user.png"
                                  }
                                  alt={f.user?.name ? f.user?.name : ""}
                                  width={32}
                                  height={32}
                                  className="rounded-full mr-1"
                                />
                              </ListItemPrefix>
                              <div>
                                <Typography variant="h6" color="blue-gray">
                                  {f.user?.name}
                                </Typography>
                              </div>
                            </div>
                            <Button
                              size="sm"
                              className="text-xs"
                              color="pink"
                              onClick={() =>
                                router.push(`/account/${f.user?.id}`)
                              }
                            >
                              詳細
                            </Button>
                          </ListItem>
                        );
                      })
                    ) : (
                      <div>none</div>
                    )}
                  </List>
                </TabPanel>
                <TabPanel value={"jugyo"}>
                  <List>
                    {selectedKoma && selectedKoma?.length > 0 ? (
                      selectedKoma?.map((f) => {
                        if (f.aki) return null;
                        return (
                          <ListItem key={f.user.id} className="justify-between">
                            <div className="flex">
                              <ListItemPrefix>
                                <Image
                                  src={
                                    f.user?.image ? f.user.image : "/user.png"
                                  }
                                  alt={f.user?.name ? f.user?.name : ""}
                                  width={32}
                                  height={32}
                                  className="rounded-full mr-1"
                                />
                              </ListItemPrefix>
                              <div>
                                <Typography variant="h6" color="blue-gray">
                                  {f.user?.name}
                                </Typography>
                              </div>
                            </div>
                            <Button
                              size="sm"
                              className="text-xs"
                              color="pink"
                              onClick={() =>
                                router.push(`/account/${f.user?.id}`)
                              }
                            >
                              詳細
                            </Button>
                          </ListItem>
                        );
                      })
                    ) : (
                      <div>none</div>
                    )}
                  </List>
                </TabPanel>
              </TabsBody>
            </Tabs>
          </div>
        </div>
      )}
    </div>
  );
}
