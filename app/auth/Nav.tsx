import Link from "next/link"
import Login from "./Login"
import Logged from "./Logged"
import { getServerSession } from "next-auth";
import { authOptions } from "../../pages/api/auth/[...nextauth]"

export default async function Nav() {
    const session = await getServerSession(authOptions);
    console.log(session);
    
    return (
      <nav className="bg-gray-300 rounded-md flex justify-between items-center p-8">
        <Link href={"/"}>
          <h1 className="font-bold text-lg">Let it out.</h1>
        </Link>
        <ul className="flex items-center gap-6">
            {!session?.user  && <Login />}
            {session?.user && <Logged image={session.user?.image || ""}/>}

        </ul>
      </nav>
    );
}