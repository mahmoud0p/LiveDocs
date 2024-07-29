'use server'

import {nanoid} from "nanoid"
import { liveblocks } from "../liveblocks"
import { revalidatePath } from "next/cache";
import { getAccessType, parseStringify } from "../utils";
import { redirect } from "next/navigation";
type createDocumentProps ={
  userId : string,
  email : string
}
type AccessType = ["room:write"] | ["room:read", "room:presence:write"];
type RoomAccesses = Record<string, AccessType>;
export const CreateDocument = async({userId , email} : createDocumentProps)=>{
  const roomId = nanoid()
  try {
    const metadata = {
      creatorId : userId ,
      email ,
      title : "untitled"
    }
    const usersAccesses : RoomAccesses  = {
      [email] : ["room:write"]
    }
    const room = await liveblocks.createRoom(roomId, {
      metadata , 
      usersAccesses ,
      defaultAccesses : ["room:write"]
    });
    revalidatePath('/')
    return parseStringify(room)
  } catch (error:any) {
    console.log('Error happened while creating a room : ' + error.message)
  }
}

export const getDocument = async({userId , roomId} : {userId : string , roomId : string})=>{
  try {
    const room = await liveblocks.getRoom(roomId)
    const hasAccess = Object.keys(room.usersAccesses).includes(userId)
    if(!hasAccess){
      throw new Error("You have no access to this room")
    }
    return parseStringify(room)
  } catch (error:any) {
    console.log(error.message)
  }

}

export const updateDocument = async({roomId , title} : {roomId : string , title : string})=>{
  try {
      const roomUpdated= await liveblocks.updateRoom(roomId , {
        metadata : {
          title
        }
      })
      revalidatePath(`/documents/${roomId}`)
      return parseStringify(roomUpdated)
  } catch (error:any) {
      console.log(error.message)
  }
}

export const getDocuments = async(email:string )=>{
  try{
    const rooms = await liveblocks.getRooms({userId:email})
    return parseStringify(rooms)
    
  }catch(error:any){
    console.log(error.message)
  }
}

export const updateDocumentAccess = async({roomId , email, userType , updatedBy} : {roomId :string , email:string ,userType:'editor' | "viewer" , updatedBy:any})=>{
  try {
    const usersAccesses  = {
      [email] : getAccessType(userType) as AccessType , 
    }
    const room = await liveblocks.updateRoom(roomId , {
      usersAccesses
    })
    if(room){
      const notificationId  = nanoid()
      await liveblocks.triggerInboxNotification({
        userId :email , 
        kind:"$documentAccess" , 
        subjectId:notificationId ,
        activityData:{
          userType , 
          title:`you have been granted ${userType} access to the document by ${updatedBy.name}` , 
          updatedBy:updatedBy.name , 
          avatar:updatedBy.avatar , 
          email : updatedBy.email
        } , 
        roomId
      })
    }
    revalidatePath(`/documents/${roomId}`)
    return parseStringify(room)
  } catch (error:any) {
    console.log(error.message)
  } 
}

export const removeCollaborator = async({roomId , email} : {roomId :string, email:string})=>{
  try {
    const room = await liveblocks.getRoom(roomId)
    if(room.metadata.email === email){
      throw new Error("You cannot remove yourself from the document")
    }
    const updatedRoom = await liveblocks.updateRoom(roomId , {
      usersAccesses:{
        [email] : null
      }
    })
    return parseStringify(updatedRoom)
  } catch (error : any) {
    console.log(error.message)
  }
}

export const deleteDocument = async({roomId } : {roomId:string})=>{
  try {
    await liveblocks.deleteRoom(roomId)
    revalidatePath('/')
    redirect('/')
  } catch (error:any) {
    console.log(error.message)
  }
}