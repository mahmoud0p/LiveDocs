'use client'
import { Button } from "@/components/ui/button"
import { CreateDocument } from "@/lib/actions/room.actions"
import { Plus } from "lucide-react"
import { useRouter } from "next/navigation"

export const CreateDocBtn = ({userId , email } : {userId: string, email: string})=>{
    const router = useRouter()
    const handleCreatingDocument =async ()=>{
        
        try {
            const room = await CreateDocument({userId , email})
            if(room) router.push(`/documents/${room.id}`)
        } catch (error : any) {
            console.log(error.message)
        }
    }
    return (
        <div>
            <Button onClick={handleCreatingDocument} variant={'secondary'}  className="shadow-md   flex items-center justify-center gap-2">
                <Plus/>
                <p className="sm:block hidden">
                    Start a new blank document
                </p>
            </Button>
        </div>
    )
}