import { CurrentUserType } from "@/types/user"

export default function Home({
  currentUser,
}: {
  currentUser: CurrentUserType
}) {
  return (
    <div>
      <div>
        {currentUser.following.map((f) => (
          <div key={f.followerId}>
            <div></div>
          </div>
        ))}
      </div>
    </div>
  )
}