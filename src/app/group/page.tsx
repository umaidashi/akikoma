import getCurrentUser from "../actions/getCurrentUser";
import Group from "./Group";

export default async function Page() {
  const currentUser = await getCurrentUser();
  if (!currentUser) return;
  return (
    <div>
      <Group currentUser={currentUser} />
    </div>
  );
}
