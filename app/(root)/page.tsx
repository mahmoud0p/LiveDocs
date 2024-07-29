
import { Header } from "@/components/ui/header";
import { DocIcon } from "@/components/ui/icons/docs";
import { CreateDocBtn } from "@/src/components/ui/CreateDocumentBtn";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import {getDocuments} from "@/lib/actions/room.actions"
import Link from "next/link";

import { DeleteModal } from "@/src/components/DeleteModal";
import { Notifications } from "@/src/components/Notifications";

const dateHandler  = (date:string)=>{
  const newDate = new Date(date)
  const day = newDate.getDate()
  const month = newDate.getMonth()
  const year = newDate.getFullYear()
  return `${month + 1}/${day}/${year}`
}
export default async function Home() {
  const clerkUser = await currentUser()
  if(!clerkUser) redirect('/sign-in')
  const documents = await getDocuments(clerkUser.emailAddresses[0].emailAddress)
  return (
    <main className="home-page-container">
        <Header className="sticky left-0 top-0 bg-gray-950 ">
            <div className="flex items-center w-full justify-end  gap-1 lg:gap-3">
              <Notifications/>
              <SignedIn>
                <UserButton/>
              </SignedIn>
            </div>
        </Header>
        {documents.data.length > 0 ? (
          <div className=" w-full px-4 sm:px-20 mx-auto ">
              <div className = "flex items-center ">
                <h3 className ="text-xl  sm:text-2xl  md:text-3xl flex-1">
                  All Documents 
                </h3>
                <CreateDocBtn
                  userId={clerkUser.id} email={clerkUser.emailAddresses[0].emailAddress} 
                />
              </div>
              <ul className="flex my-5 flex-col gap-5">
                {documents.data.map(({metadata , id ,createdAt} : {metadata:any , id :string , createdAt:string})=>(
                  <li key={id} className=" bg-gradient-to-t flex shadow from-gray-950 to-slate-900 ring-2 ring-gray-800  text-white p-4 rounded-lg">
                    <Link className="text-[#EEEE]" href={`/documents/${id}`}>
                      <div className="flex items-center justify-start gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" className="w-12 h-12 p-1 bg-gray-900 rounded" version="1.1" id="Layer_1" viewBox="0 0 512.001 512.001" xmlSpace="preserve">
                          <path className="fill-[#0084FF]" d="M332.803,10.449H95.726c-22.275,0-40.334,18.06-40.334,40.335v410.434  c0,22.276,18.059,40.334,40.334,40.334h320.546c22.275,0,40.334-18.059,40.334-40.334V134.253L332.803,10.449z"/>
                          <path className="fill-[#10BAFC]" d="M373.139,134.253h83.467L332.806,10.451v83.47C332.803,116.195,350.861,134.253,373.139,134.253z"/>
                          <path d="M463.996,126.864L340.192,3.061C338.231,1.101,335.574,0,332.803,0H95.726C67.724,0,44.944,22.782,44.944,50.784v410.434  c0,28.001,22.781,50.783,50.783,50.783h320.546c28.002,0,50.783-22.781,50.783-50.783V134.253  C467.056,131.482,465.955,128.824,463.996,126.864z M343.255,35.679l88.127,88.126H373.14c-7.984,0-15.49-3.109-21.134-8.753  c-5.643-5.643-8.752-13.148-8.751-21.131L343.255,35.679L343.255,35.679z M416.274,491.102H95.726  c-16.479,0-29.885-13.406-29.885-29.885V50.784c0.001-16.479,13.407-29.886,29.885-29.886h226.631v73.021  c-0.002,13.565,5.28,26.318,14.871,35.909c9.592,9.592,22.345,14.874,35.911,14.874h73.018v316.515  C446.158,477.696,432.752,491.102,416.274,491.102z"/>
                          <path d="M275.092,351.492h-4.678c-5.77,0-10.449,4.678-10.449,10.449c0,5.771,4.679,10.449,10.449,10.449h4.678  c5.77,0,10.449-4.678,10.449-10.449C285.541,356.17,280.862,351.492,275.092,351.492z"/>
                          <path d="M236.61,351.492H135.118c-5.77,0-10.449,4.678-10.449,10.449c0,5.771,4.679,10.449,10.449,10.449H236.61  c5.77,0,10.449-4.678,10.449-10.449C247.059,356.17,242.381,351.492,236.61,351.492z"/>
                          <path d="M376.882,303.747H135.119c-5.77,0-10.449,4.678-10.449,10.449c0,5.771,4.679,10.449,10.449,10.449h241.763  c5.77,0,10.449-4.678,10.449-10.449C387.331,308.425,382.652,303.747,376.882,303.747z"/>
                          <path d="M376.882,256H135.119c-5.77,0-10.449,4.678-10.449,10.449s4.679,10.449,10.449,10.449h241.763  c5.77,0,10.449-4.678,10.449-10.449S382.652,256,376.882,256z"/>
                          <path d="M376.882,208.255H135.119c-5.77,0-10.449,4.678-10.449,10.449s4.679,10.449,10.449,10.449h241.763  c5.77,0,10.449-4.678,10.449-10.449C387.331,212.933,382.652,208.255,376.882,208.255z"/>
                        </svg>
                        <div className="space-y-1">
                          <p className="text-sm sm:text-lg">
                              {metadata.title}
                          </p>
                          <p className=" text-xs sm:text-sm text-gray-500">
                            Created on {dateHandler(createdAt)}
                          </p>
                        </div>

                      </div>
                            
                    </Link>
                    <div  className="flex-1  justify-end flex items-center">
                        <DeleteModal roomId={id}/>
                    </div>
                </li>))}
              </ul>
          </div>
        ) : (
          <div className="w-full  flex flex-col gap-4 items-center justify-center">
            <div className="bg-gray-900 shadow-md h-fit mt-10 p-4 gap-3 w-1/2 rounded-xl flex flex-col items-center justify-center">
              <DocIcon/>
              <CreateDocBtn userId={clerkUser.id} email={clerkUser.emailAddresses[0].emailAddress} />
            </div>
              <p className="text-gray-500/50">No documents yet</p>
          </div>
        )}
    </main>
  );
}
