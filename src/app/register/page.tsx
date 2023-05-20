import { useRouter } from "next/navigation";
import getCurrentUser from "../actions/getCurrentUser";
import { RegisterForm } from "./form";

export default async function RegisterPage() {
  const currentUser = await getCurrentUser()

  return (
    <div>
      <div>
        <RegisterForm currentUser={currentUser}/>
      </div>
    </div>
  );
}
