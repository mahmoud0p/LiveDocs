import { liveblocks } from "@/lib/liveblocks";
import { getRandomColor, getUserColor } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";



export async function POST(request: Request) {
  const clerkUser = await currentUser()
  if(!clerkUser) redirect('/sign-in')
    const {id , firstName , lastName , emailAddresses , imageUrl , username} = clerkUser
  const user = {
    id:id , 
        info:{
            id , 
            name:`${firstName} ${lastName}` ,
            email : emailAddresses[0].emailAddress , 
            avatar:imageUrl , 
            username , 
            color:getUserColor(id)
        }
    }

  const { status, body } = await liveblocks.identifyUser(
    {
      userId: user.info.email,
      groupIds:[]
    },
    { userInfo: user.info },
  );

  return new Response(body, { status });
}