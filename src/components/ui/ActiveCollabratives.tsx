import { useOthers } from "@liveblocks/react/suspense"
import Image from "next/image"

export const ActiveCollaboratores  = ()=>{
    const others = useOthers()
    const collabratores = others.map(other => other.info)
    return(
        <ul className="flex gap-2 items-center justify-center">
            {
                collabratores.map(({id, name ,color ,avatar})=>(
                    <li key={id}>
                        <Image
                            src={avatar}
                            alt={name}
                            width={32}
                            height={32}
                            className="rounded-full size-9 object-cover ring-4 ring-gray-800"
                            style={{border:`2px solid ${color}` , borderRadius: '50%'}}
                        />
                    </li>
                ))
            }
        </ul>
    )
}