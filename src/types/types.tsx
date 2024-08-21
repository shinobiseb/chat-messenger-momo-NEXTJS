import { Dispatch, SetStateAction } from "react"

export type svgProps = {
    widthString: string;
    heightString: string;
}

export type signInProps = {
    setSignedIn : Dispatch<SetStateAction<string>>;
    signInState : string;
}

export type headerProps = {
    profilePic : string;
    userName : string;
}

export type MessageReq = {
    sent: boolean;
    content: string;
}

export interface ChatBoxProps {
    messages: MessageReq[] | null;
}

export interface AddChatProps {
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export type Message = {
    id: string;
    content: string;
    sent: boolean;
    timestamp: Date;
  };


export type User = {
    _id?: string;
    userName: string;
    profilePic: string;
    email: string;
    password: string;
    chats: Chat[];
}

export type Chat = {
    _id?: string;
    id: string;
    messages: Message[];
    unreadCount: number;
    participants: User['userName'];
}

export interface ChatPreview extends Chat {
    _id: string;
    id: string;
    targetUsers: string | string[];
};

export interface IUser extends Document {
    email: string;
    userName: string;
    password: string;
    chats: Chat[]; // Adjust this type based on your data structure
    profilePic: string;
    _id?: string;
}

export interface ActiveChatType {
    userName: string,
    profilePic: string,
    lastMessage?: string,
    timeSent?: string
}