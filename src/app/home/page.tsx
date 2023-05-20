import getCurrentUser from "../actions/getCurrentUser";
import getRelationsById from "../actions/getRelationsById";
import Home from "./Home";

export default async function Page() {
  const currentUser = await getCurrentUser();
  if (!currentUser) return null;
  const relationships = await getRelationsById({ userId: currentUser.id });


  return (
    <div>
      <Home currentUser={currentUser} />
    </div>
  );
}
