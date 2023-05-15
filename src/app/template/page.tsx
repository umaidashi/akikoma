import getTemplateTimetables from "@/app/actions/getTemplateTimetables";
import Test from "@/app/components/Test";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { User } from "@prisma/client";
import getTemplateTimetableById from "@/app/actions/getTemplateTimetableById";
import Link from "next/link";

export default async function Page() {
  const templateTimetables = await getTemplateTimetables();
  const user = await getCurrentUser();
  const userTemplateTimetables = await getTemplateTimetableById({
    userId: user?.id,
  });
  return (
    <div>
      {/* {templateTimetables.templateTimetables && <Test user={user} />} */}

      {userTemplateTimetables &&
        userTemplateTimetables.userTemplateTimetable &&
        user && (
          <div>
            <h3>userTemplateTimetable</h3>
            <ul>
              {userTemplateTimetables.userTemplateTimetable.map((t) => (
                <li key={t.id}>
                  <Link href={`/template/${t.id}`}>
                    {t.name}
                    {t.user?.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
    </div>
  );
}
