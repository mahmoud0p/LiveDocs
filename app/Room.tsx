"use client";

import { ReactNode } from "react";
import {
  LiveblocksProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { Loader } from "@/src/components/ui/Loader";
import { getClerkUsers, getDocumentUser } from "@/lib/actions/user.actions";
import { useUser } from "@clerk/nextjs";

export function Provider({ children }: { children: ReactNode }) {
  const {user :clerkUser} = useUser() 
  return (
    <LiveblocksProvider authEndpoint={'/api/liveblocks-auth'}
      resolveUsers={async({userIds})=>{
        const users = await getClerkUsers({userIds})
        return users
      }}
      resolveMentionSuggestions={async({roomId , text})=>{
        const roomUsers = await getDocumentUser({roomId , currentUser:clerkUser?.emailAddresses[0].emailAddress ,text })
        return roomUsers
      }}
    >
        <ClientSideSuspense fallback={<Loader/>}>
          {children}
        </ClientSideSuspense>
    </LiveblocksProvider>
  );
}