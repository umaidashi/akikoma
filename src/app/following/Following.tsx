"use client";

import {
  FollowersType,
  FollowingsType,
  RelationshipsType,
} from "@/types/relationships";
import { CurrentUserType, UserWithAll, UserWithFollowing } from "@/types/user";
import {
  Tabs,
  TabsHeader,
  Tab,
  TabsBody,
  TabPanel,
  Avatar,
  List,
  ListItem,
  ListItemPrefix,
  Typography,
  Button,
} from "../components/MaterialReact";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Following({
  users,
  currentUser,
  followings,
  followers,
}: {
  users: UserWithAll[];
  currentUser: CurrentUserType;
  followings: FollowingsType[] | undefined;
  followers: FollowersType[] | undefined;
}) {
  const router = useRouter();

  const onFollow = (followingId: string) => {
    axios
      .post("/api/following", {
        followingId: followingId,
        followerId: currentUser.id,
      })
      .then(() => {})
      .catch((error) => {
        alert(error);
      })
      .finally(() => {
        router.refresh();
      });
  };
  return (
    <div>
      <Tabs id="custom-animation" value="html">
        <TabsHeader
          className="rounded-none border-b border-pink-gray-50 bg-transparent p-0"
          indicatorProps={{
            className:
              "bg-transparent border-b-2 border-pink-500 shadow-none rounded-none",
          }}
        >
          <Tab defaultChecked={true} value={"following"}>
            フォロー
          </Tab>
          <Tab defaultChecked={false} value={"follower"}>
            フォロワー
          </Tab>
        </TabsHeader>
        <TabsBody
          animate={{
            initial: { y: 250 },
            mount: { y: 0 },
            unmount: { y: 250 },
          }}
        >
          <TabPanel value={"following"}>
            <List>
              {followings && followings?.length > 0 ? (
                followings?.map((f) => (
                  <ListItem key={f.followingId} className="justify-between">
                    <div className="flex">
                      <ListItemPrefix>
                        <Image
                          src={
                            f.following?.image ? f.following.image : "/user.png"
                          }
                          alt={f.following?.name ? f.following?.name : ""}
                          width={32}
                          height={32}
                          className="rounded-full mr-1"
                        />
                      </ListItemPrefix>
                      <div>
                        <Typography variant="h6" color="blue-gray">
                          {f.following?.name}
                        </Typography>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      className="text-xs"
                      color="pink"
                      onClick={() => router.push(`/account/${f.following?.id}`)}
                    >
                      詳細
                    </Button>
                  </ListItem>
                ))
              ) : (
                <div>none</div>
              )}
            </List>
          </TabPanel>
          <TabPanel value={"follower"}>
            <List>
              {followers && followers?.length > 0 ? (
                followers?.map((f) => (
                  <ListItem key={f.followerId} className="justify-between">
                    <div className="flex">
                      <ListItemPrefix>
                        <Image
                          src={
                            f.follower?.image ? f.follower.image : "/user.png"
                          }
                          alt={f.follower?.name ? f.follower?.name : ""}
                          width={32}
                          height={32}
                          className="rounded-full mr-1"
                        />
                      </ListItemPrefix>
                      <div>
                        <Typography variant="h6" color="blue-gray">
                          {f.follower?.name}
                        </Typography>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      className="text-xs"
                      color="pink"
                      onClick={() => router.push(`/account/${f.follower?.id}`)}
                    >
                      詳細
                    </Button>
                  </ListItem>
                ))
              ) : (
                <div>none</div>
              )}
            </List>
          </TabPanel>
        </TabsBody>
      </Tabs>

      <div className="text-lg font-bold border-l-[4px] p-2 mb-4 mt-8">
        その他のユーザー
      </div>
      <List className="m-0 p-0 my-4">
        {users && users?.length > 0 ? (
          users?.map((user) => (
            <ListItem key={user.id} className="justify-between">
              <div className="flex">
                <ListItemPrefix>
                  <Image
                    src={user?.image ? user.image : "/user.png"}
                    alt={user?.name ? user?.name : user?.id}
                    width={32}
                    height={32}
                    className="rounded-full mr-1"
                  />
                </ListItemPrefix>
                <div>
                  <Typography variant="h6" color="blue-gray">
                    {user.name}
                  </Typography>
                  <Typography
                    variant="small"
                    color="gray"
                    className="font-normal text-xs"
                  >
                    {currentUser.follower.find((f) => f.followerId === user.id)
                      ? "フォローされています"
                      : ""}
                  </Typography>
                </div>
              </div>
              <Button
                size="sm"
                className="text-xs"
                color="pink"
                onClick={() => onFollow(user.id)}
                variant={
                  currentUser.following.find((f) => f.followingId === user.id)
                    ? "outlined"
                    : "gradient"
                }
                disabled={
                  !!currentUser.following.find((f) => f.followingId === user.id)
                }
              >
                {currentUser.following.find((f) => f.followingId === user.id)
                  ? "フォロー済"
                  : "フォロー"}
              </Button>
            </ListItem>
          ))
        ) : (
          <div>none</div>
        )}
      </List>
    </div>
  );
}
