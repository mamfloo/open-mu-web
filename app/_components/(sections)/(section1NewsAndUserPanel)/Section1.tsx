import { getServerSession } from "next-auth"
import Banners from "./Banners"
import LoginForm from "./LoginForm"
import { authOptions } from "@/lib/auth"
import UserPanel from "./UserPanel";

export default async function Section1() {

  //get session information if there is show UserPanel
  const session = await getServerSession(authOptions);
  const isLogged = session?.user != undefined;


  return (
    <div className="w-full h-[400px] flex mb-10 justify-between">
        <Banners />
        <div className="w-1/3 h-[90%] flex items-center justify-center">
          {!isLogged && <LoginForm />}
          {isLogged && <UserPanel role={session.user.role}/>}
        </div>
        
    </div>
  )
}
