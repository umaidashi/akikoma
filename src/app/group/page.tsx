import getCurrentUser from "../actions/getCurrentUser";
import getGroups from "../actions/getGroups";
import Group from "./Group";

export default async function Page() {
  const currentUser = await getCurrentUser();
  const groups = await getGroups();
  if (!currentUser) return;
  return (
    <div>
      <Group currentUser={currentUser} groups={groups?.groups} />
    </div>
  );
}
