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