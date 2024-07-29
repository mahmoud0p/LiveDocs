'use client'
import {
    RoomProvider,
    ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { Header } from "@/components/ui/header"
import { Editor } from "@/src/components/editor/Editor"
import {SignInButton,
  SignedIn,
  SignedOut,
  UserButton} from "@clerk/nextjs"
import { Button } from "@/components/ui/button";

import { LucideShare, SquarePen } from "lucide-react";
import { ActiveCollaboratores } from "./ActiveCollabratives";
import { TooltipContainer } from "./tooltip";
import { FormEvent, KeyboardEvent, KeyboardEventHandler, useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { updateDocument } from "@/lib/actions/room.actions";
import { Loader } from "./Loader";
import { ShareModal } from "../shareModal";
export const CollabrativeRoom = ({roomId ,roomMetaData ,currentUserType , usersData}:{roomId: string, roomMetaData: any,currentUserType : "editor" | "viewer" , usersData:any })=>{
    const [editing , setEditing] = useState(false)
    const [saving , setSaving] = useState(false)
    const [title ,setTitle] = useState(roomMetaData.title)
    const inputRef = useRef<HTMLInputElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const handleKeyDown = async(e:KeyboardEvent<HTMLInputElement>)=>{
      if(e?.key === 'Enter'){
          setSaving(true) ; 
          try {
              if(title !== roomMetaData.title){
                const updatedDocument =await  updateDocument({roomId , title})
                if(updatedDocument){
                  setEditing(false)
                }
              }
          } catch (error:any) {
            console.log(error.message)
          }
          finally{
            setSaving(false)
          }
      }
      
    }
    useEffect(()=>{
      const handleClickOutside = (e:MouseEvent)=>{
        if(containerRef.current && !containerRef.current.contains(e.target as Node)){
          setEditing(false)
        }
        updateDocument({roomId , title})
      }
      document.addEventListener('mousedown',handleClickOutside)
      return ()=>{
        document.removeEventListener('mousedown',handleClickOutside)
      }
    } , [title , roomId])
    useEffect(()=>{
      if(editing && inputRef.current){
        inputRef.current?.focus()
      }
    } , [editing])
    return (
        <RoomProvider id={roomId}>
          <ClientSideSuspense fallback={<Loader/>}>
            <div className="collabrative-room w-full flex flex-col gap-4 items-center justify-center">
            <Header className="bg-transparent">
                <div className="share-container w-full  flex flex-row items-center justify-end gap-2 sm:gap-3">
                  <div ref={containerRef} className=" flex-1 gap-1 flex justify-center items-center">
                    {editing && !saving ? 
                    <>
                      <input  type="text" ref={inputRef}
                        onChange={(e:FormEvent<HTMLInputElement>)=>setTitle(e.currentTarget.value)}
                        value={title}
                        disabled={!editing}
                        placeholder="Enter document title"
                        onKeyDown={handleKeyDown}
                        className=" text-center  !text-md sm:text-xl   border-0 outline-none bg-transparent focus:outline-none w-max"/>
                    </> 
                     :
                     <>
                        <p  className=" text-white text-sm sm:text-xl">{title}</p>
                          {currentUserType==="editor" && !saving &&<button onClick={()=>{
                            setEditing(true)
                          }} className="text-blue-500 ">
                            <TooltipContainer content="Click to edit">
                              <SquarePen color="#2519cc" width={24} height={24} className="size-4 sm:size-5"/>
                            </TooltipContainer>
                          </button>}
                          {saving && <p className="text-blue-500/30">saving...</p>}
                     </>
                     }
                  </div>
                  <ActiveCollaboratores/>
                  <ShareModal
                    currentUserType = {currentUserType}
                    collaborators = {usersData}
                    creatorId = {roomMetaData.creatorId}
                    roomId = {roomId}
                  />
                  <SignedOut>
                    <SignInButton />
                  </SignedOut>
                  <SignedIn>
                    <UserButton  />
                  </SignedIn>
                </div>
              </Header>
              <div className="w-full">
                  <Editor roomId={roomId} currentUserType={currentUserType}/>
              </div>
            </div>
          </ClientSideSuspense>
      </RoomProvider>
    )
}