import { cn } from "@/lib/utils"
import { useIsThreadActive } from "@liveblocks/react-lexical"
import { Composer, Thread } from "@liveblocks/react-ui"
import { useThreads } from "@liveblocks/react/suspense"

const ThreadWrapper = ({thread} :{thread : any})=>{
    const isActive = useIsThreadActive(thread.id)
    return (
        <Thread thread={thread}
        data-state = {isActive ? "active"  :null}
        className={cn("comment-thread border  w-full lg:w-[420px] " , isActive && "!border-blue-500 shadow-md" , thread.resolved&& " !opacity-40 ")}
        />
    )
}

export const Comments  = ()=>{
    const {threads} = useThreads()

    return(
        <>
            <div className="xl:flex xl:flex-col grid grid-flow-dense grid-cols-1  md:grid-cols-2 mb-5  gap-5 flex-1 items-start ">
                <div className="w-full h-fit lg:min-w-[420px] max-w-[420px]">
                    <Composer/>
                </div> 
                    {threads.map(thread=>(
                        <ThreadWrapper key={thread.id} thread={thread}/>
                    ))}
            </div>
        </>
    )
}

