"use client"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { InboxNotification, InboxNotificationList, LiveblocksUIConfig } from "@liveblocks/react-ui";
import { useInboxNotifications, useUnreadInboxNotificationsCount } from "@liveblocks/react/suspense";
import { Bell } from "lucide-react";
import Image from "next/image";
import { ReactNode } from "react";

export function Notifications() {
  const { inboxNotifications } = useInboxNotifications();
  const { count } = useUnreadInboxNotificationsCount();
  const unreadNotifications = inboxNotifications.filter(n => !n.readAt);

  return (
    <Popover>
      <PopoverTrigger className="relative flex size-6 items-center justify-center">
        <Bell  width={24} height={24} />
        {count > 0 && (
          <div className="absolute ring-2 ring-gray-950 overflow-hidden text-ellipsis text-nowrap -top-1 text-xs flex items-center justify-center -right-1 size-4 rounded-full bg-blue-500">
            {count}
          </div>
        )}
      </PopoverTrigger>
      <PopoverContent align="end" className="!w-[420px] bg-slate-900 border-gray-800 text-blue-100">
        <h3>Notifications</h3>
        <LiveblocksUIConfig
          overrides={{
            INBOX_NOTIFICATION_TEXT_MENTION: (user: ReactNode) => {
              return <>{user} mentioned you.</>;
            },
          }}
        />
        <InboxNotificationList>
          {unreadNotifications.length <= 0 && (
            <p className="text-center text-gray-500 py-2">No new notifications</p>
          )}
          {unreadNotifications.length > 0 &&
            unreadNotifications.map((n) => (
              <InboxNotification
                key={n.id}
                inboxNotification={n}
                className="bg-gray-800 rounded-xl items-center focus:outline-none flex gap-4 !text-white !text-sm font-thin"
                href={`/documents/${n.roomId}`}
                showActions={false}
                kinds={{
                  thread: (props) => (
                    <InboxNotification.Thread
                      {...props}
                      showActions={false}
                      showRoomName={false}
                    />
                  ),
                  textMention: (props) => (
                    <InboxNotification.TextMention
                      {...props}
                      showRoomName={false}
                    />
                  ),
                  $documentAccess: (props) => (
                    <InboxNotification.Custom
                      aside={
                        <InboxNotification.Icon className="bg-transparent">
                          <Image
                            src={
                              props.inboxNotification.activities[0].data.avatar as string || ''
                            }
                            height={36}
                            width={36}
                            alt="avatar"
                            className="rounded-full min-w-10 min-h-10 size-10 object-cover "
                          />
                        </InboxNotification.Icon>
                      }
                      {...props}
                      title={props.inboxNotification.activities[0].data.title}
                    >
                      {props.children}
                    </InboxNotification.Custom>
                  ),
                }}
              />
            ))}
        </InboxNotificationList>
      </PopoverContent>
    </Popover>
  );
}
