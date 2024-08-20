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

export interface chatProps {
  userName: string,
  profilePic: string,
  lastMessage: string,
  timeSent: string
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

export type ChatPreview = {
    _id: string;
    id: string;
    lastMessage: {
      content: string;
    } | null;
    unreadCount: number;
    targetUser: string; // Point to User Data in User Collection
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
    participants: User[] | User;
}

export interface IUser extends Document {
    email: string;
    userName: string;
    password: string;
    chats: any[]; // Adjust this type based on your data structure
    profilePic: string;
}