import { getUser } from "@/actions";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Client } from "./ui/Client";


interface Props {
  searchParams: {
    show: string;
  }
}

export default async function ProfilePage({ searchParams }: Props) {

  const session = await auth();
  if(!session)  redirect("/auth/login");

  // Search the user by id
  const { user, hasPass } = await getUser(session.user.id);
  if(!user) redirect("/auth/login");

  return (
    <>
      {user.id && (
        <>
          <Client
            userServer={user}
            params={searchParams}
            hasPass={hasPass}
          />
        </>
      )}
    </>
  );
}
