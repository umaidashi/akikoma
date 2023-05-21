import InitialPage from "./InitialPage";
import getCurrentUser from "./actions/getCurrentUser";

export default async function Home() {
  const currentUser = await getCurrentUser();
  return (
    <div>
      <div className="flex justify-between items-center text-lg font-bold border-l-[4px] p-2 mb-4">
        Welcome to Akikoma!!
      </div>
      <InitialPage currentUser={currentUser} />
    </div>
  );
}
