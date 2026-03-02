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
    id: string;
    content: string;
    sender: string;
    currentUser: string;
}

export interface ChatBoxProps {
    messages: MessageReq[] | null;
}

export interface AddChatProps {
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    fetchChats?: () => void;
}

export type Message = {
    id: string;
    content: string;
    sender: string;
    // sent: boolean;
    // timestamp: Date;
  }

export interface SidebarProps {
  user: IAuthSession['user']; // This grabs the user shape specifically from your session type
}

export type IUser = {
    id?: string;
    name: string;
    email: string;
    image: string;
    emailVerified?: boolean | null;
}

export type Chat = {
    _id?: string;
    messages: MessageReq[];
    participants: string[];
    lastMessage?: String;
}

export interface IAuthSession {
    user : {
        id?: string;
        name?: string | null | undefined;
        email?: string | null | undefined;
        image?: string | null | undefined;
        emailVerified?: boolean | null;
    },
    id: string,
    sessionToken: string,
    userId: string,
    expires: string
}

export interface ActiveChatType {
    targetUserName: string,
    profilePic: string,
    lastMessage?: string,
    timeSent?: string,
    chatId?: string,
    onClickFunction?: (chatId: string )=> void
}

export interface ActiveChatListType {
  user: IUser | null;
  chats: Chat[];
  fetchChats?: () => void;
  handleChatClick: (chatId: string) => void;
}

export interface ChatWindowProps {
    messages: MessageReq[],
    userName: string;
    chatID: string;
    fetchMessagesFunction: (chatId: string) => Promise<Chat | undefined>;
    currentWebSocket: WebSocket | null;
}

export interface textBoxProps {
    chatId: string;
    fetchMessagesFunction: (chatId: string) => Promise<Chat | undefined>;
    currentWebSocket: WebSocket | null;
}

export declare namespace JSX {
    interface IntrinsicElements {
      'l-ping': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }