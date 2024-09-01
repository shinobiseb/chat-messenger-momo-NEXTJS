import { MessageReq } from "@/types/types";
import Message from "./Message";
import { ChatBoxProps } from '@/types/types';

export default function ChatBox({ messages }: ChatBoxProps) {
    function messageMapper(messages: MessageReq[]) {
        if (messages.length > 0) {
            return messages.map((message, index) => (
                <Message key={index} sent={message.sent} content={message.content} />
            ));
        } else {
            console.table(messages);
            return null;
        }
    }

    return (
        <div className='w-screen h-full text-white px-3 flex flex-col overflow-auto pt-16'>
            {messages ? messageMapper(messages) : <p>No messages to display</p>}
        </div>
    );
}