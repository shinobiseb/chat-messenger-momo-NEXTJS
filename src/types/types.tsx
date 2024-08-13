import { Dispatch, SetStateAction } from "react"

export type svgProps = {
    widthString: string;
    heightString: string;
}

export type signInProps = {
    setSignedIn : Dispatch<SetStateAction<boolean>>;
    signInState : boolean;
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

export type Chat = {
  id: string;
  participants: string[]
  messages: Message[];
};

export type ChatPreview = {
    id: string;
    participants: string[]; // e.g., user IDs
    lastMessage: {
      content: string;
      sent: boolean;
      timestamp: Date;
    };
    unreadCount: number; // Number of unread messages for the current user
  };