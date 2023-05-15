import { UserWithFollowing } from "@/types/user";
import getAllUsers from "../actions/getAllUsers";
import getCurrentUser from "../actions/getCurrentUser";
import Following from "../components/Following";

export default async function Page() {
  const currentUser = await getCurrentUser();
  const users = await getAllUsers();

  if (!currentUser || !users?.users) return null;
  return (
    <div>
      <div>Following</div>
      <Following
        currentUser={
          currentUser as unknown as Omit<
            UserWithFollowing,
            "createdAt" | "updatedAt" | "emailVerified"
          >
        }
        users={users.users}
      />
    </div>
  );
}
