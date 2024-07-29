import { getDocument } from "@/lib/actions/room.actions"
import { getClerkUsers } from "@/lib/actions/user.actions"
import { CollabrativeRoom } from "@/src/components/ui/CollabrativeRoom"
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

async function Document({params:{id}} : {params:{id: string}}){
  const clerkUser = await currentUser()
  if(!clerkUser) redirect('/sign-in')
    const room = await getDocument({
      roomId : id,
      userId : clerkUser.emailAddresses[0].emailAddress,
    })
    if(!room){
      redirect('/')
    }
    //get users accesses 
    const userIds = Object.keys(room.usersAccesses)
    const users : any[] = await getClerkUsers({userIds})
    const usersData = users.map(user=>({
      ...user , 
      userType : room.usersAccesses[user.email]?.includes('room:write') ? 'editor' : 'viewer'
    }))
    const currentUserType = room.usersAccesses[clerkUser.emailAddresses[0].emailAddress]?.includes('room:write') ? 
    'editor' : 'viewer' ; 
  return (
    <div className="w-full flex flex-col  gap-4 justify-center items-center ">
        <CollabrativeRoom roomId={room.id} roomMetaData={room.metadata} usersData={usersData} currentUserType ={currentUserType}/>
    </div>
  )
}

export default Document