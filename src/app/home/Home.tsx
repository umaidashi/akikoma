import { FollowingsType, RelationshipsType } from "@/types/relationships";
import { CurrentUserType } from "@/types/user";

export default function Home({
  currentUser,
  followings,
}: {
  currentUser: CurrentUserType;
  followings: FollowingsType[] | undefined;
}) {
  return (
    <div>
      <div>
        {followings?.map((f) => (
          <div key={f.followerId}>
            <div>{f.following?.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
