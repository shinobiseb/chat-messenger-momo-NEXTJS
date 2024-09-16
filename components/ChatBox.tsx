import { MessageReq } from "@/types/types";
import Message from "./Message";
import { ChatBoxProps } from '@/types/types';
import useCookie from "@/lib/useCookie";

export default function ChatBox({ messages }: ChatBoxProps) {



    function messageMapper(messages: MessageReq[]) {
            
        if (messages.length > 0) {
            console.log(messages[0])
            return messages.map((message, index) => (
                <Message 
                id={index.toString()}
                key={index}
                sender={message.sender}
                content={message.content}
                />
            ));
        } else {
            return null;
        }
    }

    return (
        <div className='w-screen h-full text-white px-3 flex flex-col overflow-auto pt-16'>
            {
                messages ? 
                messageMapper(messages) : 
                null
            }
        </div>
    );
}