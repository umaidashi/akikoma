import { UserWithFollowing } from "@/types/user";
import getAllUsers from "../actions/getAllUsers";
import getCurrentUser from "../actions/getCurrentUser";
import Following from "./Following";
import getRelationsById from "../actions/getRelationsById";

export default async function Page() {
  const currentUser = await getCurrentUser();
  const users = await getAllUsers();
  if (!currentUser || !users?.users) return null;
  const relationships = await getRelationsById({ userId: currentUser.id });

  return (
    <div>
      <Following
        currentUser={currentUser}
        users={users.users}
        followings={relationships?.followings}
        followers={relationships?.followers}
      />
    </div>
  );
}
