import Image from "next/image";
import { useState } from "react";
import { UserTypeSelector } from "./userTypeSelector";
import { Button } from "@/components/ui/button";
import { removeCollaborator, updateDocumentAccess } from "@/lib/actions/room.actions";
import { nanoid } from "nanoid";

export const Collaborator = ({ roomId, email, creatorId, collaborator, user } : { roomId: string, email: string, creatorId: string, collaborator: any, user: any }) => {
    const [userType, setUserType] = useState(collaborator.userType || 'viewer');
    const [loading, setLoading] = useState(false);

    const shareDocumentHandler = async (type: 'editor' | 'viewer') => {
        try {
            setLoading(true);
            await updateDocumentAccess({ roomId, email, userType: type, updatedBy: user });
        } catch (error: any) {
            console.log(error.message);
        } finally {
            setLoading(false);
        }
    };

    const removeUserHandler = async (email: string) => {
        try {
            setLoading(true);
            await removeCollaborator({ roomId, email });
        } catch (error: any) {
            console.log(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <li className="flex items-center justify-between gap-2 py-3" key={nanoid()}>
            <div className="flex gap-2">
                <Image 
                    width={36} 
                    height={36} 
                    src={collaborator.avatar} 
                    alt="user avatar"
                    className="rounded-full size-9"
                />
                <div className="flex flex-col">
                    <p className="line-clamp-1 capitalize text-ellipsis text-sm text-semibold leading-4 text-white">
                        {collaborator.name}
                        <span className="pl-2 !text-blue-300/30">
                            {loading && "updating..."}
                        </span>
                    </p>
                    <p className="text-blue-100 font-light text-sm">
                        {collaborator.email}
                    </p>
                </div>
            </div>
            {collaborator.id === creatorId ? (
                <p className="text-sm text-blue-500 bg-blue-500/10 px-3 rounded-full">Owner</p>
            ) : (
                <div className="flex items-center gap-3">
                    <UserTypeSelector 
                        userType={userType} 
                        setUserType={setUserType}
                        onClickHandler={shareDocumentHandler}
                    />
                    <Button 
                        className="bg-red-600 hover:bg-red-700" 
                        onClick={() => removeUserHandler(collaborator.email)} 
                        type="button"
                    >
                        Remove
                    </Button>
                </div>
            )}
        </li>
    );
};
