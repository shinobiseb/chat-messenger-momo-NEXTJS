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
    sent: boolean;
}

export interface ChatBoxProps {
    messages: MessageReq[] | null;
}

export interface AddChatProps {
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    fetchChats: () => void;
}

export type Message = {
    id: string;
    content: string;
    sender: string;
    // sent: boolean;
    // timestamp: Date;
  };


export type User = {
    _id?: string;
    userName: string;
    profilePic: string;
    email: string;
    password: string;
}

export type Chat = {
    _id?: string;
    messages: MessageReq[];
    participants: User['userName'];
}

export type ChatInfo = {
    chatId: string ;
    messages: Message[];
    targetUser: string;
}

// export interface ChatPreview extends Chat {
//     _id: string;
//     id: string;
//     targetUsers: string | string[];
// };

export interface IUser extends Document {
    email: string;
    userName: string;
    password: string;
    chats: Chat[]; // Adjust this type based on your data structure
    profilePic: string;
    _id?: string;
}

export interface ActiveChatType {
    targetUserName: string,
    profilePic: string,
    lastMessage?: string,
    timeSent?: string,
    chatId?: string,
    onClickFunction: (chatId: string )=> void
}

export interface ActiveChatListType {
  user: User | null;
  chats: Chat[];
  fetchChats: () => void;
  handleChatClick: (chatId: string) => void;
}

export interface ChatWindowProps {
    messages: MessageReq[],
    userName: string;
    chatID: string;
}

export interface textBoxProps {
    chatId: string;
}

declare namespace JSX {
    interface IntrinsicElements {
      'l-ping': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }