'use client'

import { MessageReq } from "@/types/types";
import Message from "./Message";
import { ChatBoxProps } from '@/types/types';
import { useEffect, useRef } from "react";
import { useParams } from "next/navigation";

export default function ChatBox({ messages }: ChatBoxProps) {
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    function scrollToBottom() {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }

    const params = useParams()
    const currentUser = typeof params.user === "string" ? params.user : "";
    
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    function messageMapper(messages: MessageReq[]) {
        if (messages.length) {
            return messages.map((message, index) => (
                <Message 
                    currentUser={currentUser}
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
        <div className='w-full h-full text-white px-3 flex flex-col overflow-auto pt-16'>
            {messages ? messageMapper(messages) : null}
            {/* Ref element for scrolling */}
            {/* <div ref={messagesEndRef}/> */}
        </div>
    );
}
