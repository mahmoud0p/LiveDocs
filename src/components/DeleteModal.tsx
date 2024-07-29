'use client'
import { useState } from "react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Trash } from "lucide-react"
import { deleteDocument } from "@/lib/actions/room.actions"
  

export const DeleteModal = ({roomId} : {roomId:string})=>{
    const [open, setOpen] = useState(false)
    const  [loading, setLoading] = useState(false)
    const deleteDocumentHandler = async()=>{
        try {
            setLoading(true)
            await deleteDocument({roomId }).then(()=>{
                setOpen(false)
            })
            
        } catch (error:any) {
            console.log(error.message)
        }
        finally{
            setLoading(false)
        }
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
                <Button   onClick={()=>setOpen(true)} className="text-sm   bg-red-500/10 text-red-500 hover:bg-red-500/20 gap-1">
                    <Trash width={20} height={20} className="md:size-5 " color="rgb(220, 67, 73)"/>
                </Button>
            <DialogContent className="bg-gray-950 border border-slate-900">
                <DialogHeader>
                <DialogTitle>Delete this document?</DialogTitle>
                <DialogDescription>
                    This action will permanently delete this document.
                </DialogDescription>
                </DialogHeader>
                <Button disabled={loading} type="submit" onClick={deleteDocumentHandler} className="!text-sm   bg-gradient-to-t from-red-700  to-red-500 hover:from-red-800 hover:to-red-700">
                    {loading ? "Deleting..." : "Delete"}
                </Button>
            </DialogContent>
        </Dialog>

    )
}