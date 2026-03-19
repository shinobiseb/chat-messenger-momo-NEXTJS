import { Dispatch, SetStateAction } from "react"
import { ObjectId } from "mongodb";

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
    recipient : string;
}

export interface IMessage {
    id: string;
    content: string;
    sender: string;
    timestamp: Date;
}

export interface ChatBoxProps {
    messages: IMessage[] | null;
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
    _id?: ObjectId | string;
    messages: IMessage[];
    participants: string[];
    timestamp: Date;
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
    currentUser: string,
    targetUserName: string,
    lastMessage?: String,
    timeSent?: string,
    chatId?: string,
    fetchSidebarChats: Function,
    onClickFunction?: (chatId: string )=> void,
}

export interface ActiveChatListType {
  user: IUser | null;
  chats: Chat[];
  fetchChats?: () => void;
}

export interface ChatWindowProps {
    messages?: IMessage[],
    recipient: string;
    chatID: string;
    fetchMessagesFunction?: (chatId: string) => Promise<Chat | undefined>;
    currentWebSocket?: WebSocket | null;
}

export interface textBoxProps {
    chatId: string;
    fetchMessagesFunction: (chatId: string) => Promise<Chat | undefined>;
    currentWebSocket?: WebSocket | null;
}

export declare namespace JSX {
    interface IntrinsicElements {
      'l-ping': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }