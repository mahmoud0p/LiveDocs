import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

export const UserTypeSelector = ({userType , setUserType , onClickHandler} : {userType:"editor" | 'viewer' , setUserType:(value:"editor" | 'viewer' )=>void , onClickHandler?:(value: 'editor' | "viewer") => void })=>{
    return (
        <Select value={userType} onValueChange={(value : 'editor' | "viewer")=>{
            setUserType(value)
            onClickHandler && onClickHandler(value)
            }}>
            <SelectTrigger className="w-[120px] bg-gray-900 ring-offset-0  border border-slate-900 ring-0">
                <SelectValue/>
            </SelectTrigger>
            <SelectContent className="bg-gray-900  text-blue-100 border border-slate-900 ">
                <SelectGroup>
                <SelectLabel>User Actions</SelectLabel>
                <SelectItem className="hover:!bg-gray-800 hover:!text-blue-200 "  value="editor">Can edit</SelectItem>
                <SelectItem className="hover:!bg-gray-800 hover:!text-blue-200 " value="viewer">View only</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}