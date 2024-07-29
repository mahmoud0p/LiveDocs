'use client'
import { useSelf } from "@liveblocks/react/suspense"
import { FormEvent, useEffect, useState } from "react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { SquareArrowOutUpRight } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { UserTypeSelector } from "./userTypeSelector"
import { Collaborator } from "./Collaborator"
import { updateDocumentAccess } from "@/lib/actions/room.actions"
  
type Props ={
    roomId : string, 
    currentUserType : "editor" | 'viewer' , 
    collaborators :any[] , 
    creatorId : string
}
export const ShareModal = ({roomId , currentUserType , collaborators , creatorId} : Props)=>{
    const user = useSelf()
    const [open, setOpen] = useState(false)
    const  [loading, setLoading] = useState(false)
    const [email , setEmail] = useState('')
    const [userType , setUserType] = useState<'editor'|'viewer'>("viewer")
    useEffect(()=>{
        console.log(currentUserType)
    } , [currentUserType])
    const shareDocumentHandler = async()=>{
        try {
            setLoading(true)
            await updateDocumentAccess({roomId , email ,userType , updatedBy : user.info})
            
        } catch (error:any) {
            console.log(error.message)
        }
        finally{
            setLoading(false)
        }
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
                <Button disabled={currentUserType !== "editor"}  onClick={()=>{
                    setOpen(true)
                    }} className="text-sm font-thin bg-transparent sm:bg-gradient-to-t from-blue-700  to-blue-400 hover:from-blue-800 hover:to-blue-700 gap-1">
                        <span className="sm:block hidden">Share</span> 
                    <SquareArrowOutUpRight width={20} height={20} className="md:size-4 size-3" color="white"/>
                </Button>
            <DialogContent className="bg-gray-950 border border-slate-900">
                <DialogHeader>
                <DialogTitle>Who can view this project?</DialogTitle>
                <DialogDescription>
                    Select Who can view and edit this document
                </DialogDescription>
                </DialogHeader>
                <Label htmlFor="email" className="mt-6 text-blue-100">
                    Email address
                </Label>
                <div className="flex gap-2">
                    
                    <Input
                        id="email"
                        placeholder="Enter email address"
                        autoComplete="off"
                        className="bg-gray-900  border  border-slate-800 outline-slate-800"
                        value={email}
                        onChange={(e:FormEvent<HTMLInputElement>)=>setEmail(e.currentTarget.value)}
                    />
                    <UserTypeSelector
                        userType={userType} 
                        setUserType={setUserType}
                    />
                    <Button disabled={loading} type="submit" onClick={shareDocumentHandler} className="text-sm font-thin bg-gradient-to-t from-blue-700  to-blue-400 hover:from-blue-800 hover:to-blue-700">
                        {loading ? "Sending..." : "Invite"}
                    </Button>
                </div>
                <div className="my-2 space-y-2">
                    <ul className="flex flex-col">
                        {collaborators.map(collaborator=>(
                            <Collaborator key={collaborator.id} roomId={roomId} creatorId={creatorId} email={collaborator.email}
                                collaborator={collaborator}
                                user={user.info}
                            />
                        ))

                        }
                    </ul>
                </div>
            </DialogContent>
        </Dialog>

    )
}