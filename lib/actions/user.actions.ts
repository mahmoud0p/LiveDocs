'use server'

import { clerkClient } from "@clerk/nextjs/server"
import { parseStringify } from "../utils"
import { liveblocks } from "../liveblocks"

export const getClerkUsers = async({userIds} : {userIds : string[] })=>{
    try{
        const {data} = await clerkClient.users.getUserList({emailAddress : userIds})
        const users = data.map(user=>({
            id : user.id ,
            email : user.emailAddresses[0].emailAddress,
            username : user.username,
            avatar : user.imageUrl,
            name:`${user.firstName} ${user.lastName}`
        }))
        const sortedUsers = userIds.map((email)=>{
            return users.find(user=>user.email === email)
        })
        return parseStringify(sortedUsers)
    }catch(error:any){
        console.log(error.message)
    }

}

export const getDocumentUser = async({roomId , currentUser , text} : {roomId:string, currentUser:any , text:string})=>{
    try {
        const room = await liveblocks.getRoom(roomId)
        const users = Object.keys(room.usersAccesses ).filter((email)=>email !== currentUser)
        if(text.length>0){
            const lowerCaseText = text.toLowerCase() ; 
            const filteredUsers = users.filter(email => email.toLowerCase().includes(lowerCaseText))
            return parseStringify(filteredUsers)
        }
        return parseStringify(users)
    } catch (error:any) {
        console.log(error.message)
    }
}