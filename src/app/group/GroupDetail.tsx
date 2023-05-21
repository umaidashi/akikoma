"use client";
import {
  GroupTimetableWithTimetable,
  GroupUserWithUser,
  GroupWithAll,
} from "@/types/group";
import { KomaWithAll } from "@/types/koma";
import { useState, useEffect } from "react";
import Image from "next/image";
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
import { TimetableWithAll } from "@/types/timetable";
import { CurrentUserType } from "@/types/user";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faUsers, faLock } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import axios from "axios";

const DAY = ["Mon", "Tue", "Wed", "Thu", "Fri"];

export default function GroupDetail({
  group,
  groupUser,
  komas,
  groupTimetables,
  currentUser,
}: {
  group: GroupWithAll | undefined;
  groupUser: GroupUserWithUser[] | undefined;
  komas: KomaWithAll[] | undefined;
  groupTimetables: GroupTimetableWithTimetable[] | undefined;
  currentUser: CurrentUserType | undefined | null;
}) {
  const [memberVisible, setMemberVisible] = useState<boolean>(false);
  const now = "10:00";
  const Day = 1;

  const isMember = !!groupUser?.find((user) => user.userId === currentUser?.id);

  const router = useRouter();

  const nowKomas = komas?.filter((koma) => {
    const start = `${koma.startH}:${koma.startM}`;
    const end = `${koma.endH}:${koma.endM}`;
    if (koma.day === Day && start < now && now < end) {
      return koma;
    }
  });

  const isNowKoma = (koma: KomaWithAll) => {
    const start = `${koma.startH}:${koma.startM}`;
    const end = `${koma.endH}:${koma.endM}`;
    return koma.day === Day && start < now && now < end;
  };

  const [timetableData, setTimetableData] = useState<KomaWithAll[][][]>([]);
  const [selectedKoma, setSelectedKoma] = useState<KomaWithAll[] | undefined>();

  useEffect(() => {
    if (!komas) return;

    const temp: KomaWithAll[][][] = [...Array(5)].map((_, dayIndex) =>
      [...Array(5)].map((_, komaIndex) => {
        const koma = komas.filter(
          (koma) => koma.day === dayIndex && koma.num === komaIndex
        );
        return koma;
      })
    );
    setTimetableData(temp);
  }, [komas]);

  const openKoma = (d: number, k: number) => {
    if (!komas) return;
    const temp = komas.filter((koma) => koma.day === d && koma.num === k)[0];
    const koma = komas.filter((k) => k.day === temp.day && k.num === temp.num);
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

  const joinGroup = async () => {
    await axios
      .post("/api/joinGroup", {
        groupId: group?.id,
        userId: currentUser?.id,
        timetableId: currentUser?.Timetable.filter((t) => t.selected)[0].id,
      })
      .finally(() => {
        router.refresh();
      });
  };

  if (!groupTimetables || !currentUser) return null;
  return (
    <div>
      <div className="flex justify-between items-center text-lg font-bold border-l-[4px] px-2 mb-4">
        <div className="flex-1">
          {group?.name}
          {!group?.public && (
            <div className="text-xs text-gray-400 font-regular">
              <FontAwesomeIcon
                icon={faLock}
                size="sm"
                className="mr-1"
                fill="#333333"
              />
              private
            </div>
          )}
        </div>
        <List className="p-0 min-w-[80px]">
          <ListItem onClick={() => setMemberVisible(true)}>
            <div className="flex overflow-auto items-center -space-x-4">
              <FontAwesomeIcon
                icon={faUsers}
                size="lg"
                className="mr-6"
                fill="#333333"
              />
              {groupUser?.map(
                (user, i) =>
                  i < 8 && (
                    <Image
                      src={user.user?.image ? user.user.image : "/user.png"}
                      alt={user.user?.name ? user.user?.name : ""}
                      width={36}
                      height={36}
                      className="rounded-full border-2 border-white hover:z-10 focus:z-10 bg-white"
                      key={user.user.id}
                    />
                  )
              )}
            </div>
          </ListItem>
        </List>
      </div>
      {!isMember && (
        <div>
          <Button
            color="pink"
            variant="outlined"
            className="text-md my-3"
            onClick={joinGroup}
            fullWidth
          >
            参加する
          </Button>
        </div>
      )}
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
                  ((koma.filter((f) => f.aki).length / groupTimetables.length) *
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
                    /{groupTimetables.length}
                  </div>
                  <div className="flex overflow-auto items-center -space-x-2">
                    {koma.map(
                      (k, i) =>
                        i < 3 &&
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
            <Tabs id="custom-animation" value="html">
              <TabsHeader
                className="rounded-none border-b border-pink-gray-50 bg-transparent p-0"
                indicatorProps={{
                  className:
                    "bg-transparent border-b-2 border-pink-500 shadow-none rounded-none",
                }}
              >
                <Tab
                  defaultChecked={true}
                  className="font-bold text-gray-500 text-sm pb-2"
                  value={"aki"}
                >
                  空き
                </Tab>
                <Tab
                  defaultChecked={false}
                  className="font-bold text-gray-500 text-sm pb-2"
                  value={"jugyo"}
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
      {memberVisible && (
        <div>
          <div className="fixed h-screen w-full max-w-[450px] top-0 left-0 z-50">
            <div
              className="fixed h-screen w-full top-0 left-0 bg-white opacity-50"
              onClick={() => setMemberVisible(false)}
            ></div>
            <div className="fixed w-full h-[65vh] bg-white bottom-0 left-0 -z-auto rounded-t-3xl p-8">
              <div className="flex justify-between items-center text-lg font-bold border-l-[4px] px-2 mb-4">
                メンバー一覧
                <IconButton
                  color="gray"
                  variant="outlined"
                  onClick={() => setMemberVisible(false)}
                >
                  <FontAwesomeIcon icon={faClose} size="xl" />
                </IconButton>
              </div>
              <List>
                {groupUser?.map((user) => (
                  <ListItem key={user.user.id} className="justify-between">
                    <div className="flex">
                      <ListItemPrefix>
                        <Image
                          src={user.user?.image ? user.user.image : "/user.png"}
                          alt={user.user?.name ? user.user?.name : ""}
                          width={32}
                          height={32}
                          className="rounded-full mr-1"
                        />
                      </ListItemPrefix>
                      <div>
                        <Typography variant="h6" color="blue-gray">
                          {user.user?.name}
                        </Typography>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      className="text-xs"
                      color="pink"
                      onClick={() => router.push(`/account/${user.user?.id}`)}
                    >
                      詳細
                    </Button>
                  </ListItem>
                ))}
              </List>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
