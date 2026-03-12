'use client'

import { IMessage } from "@/types/types";
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

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    function messageMapper(messages: IMessage[]) {
        if (messages.length) {
            return messages.map((message, index) => (
                <Message 
                    id={index.toString()}
                    key={index}
                    sender={message.sender}
                    content={message.content}
                    timestamp={message.timestamp}
                />
            ));
        } else {
            return null;
        }
    }

    return (
        <div className='w-full text-white px-3 pt-3 flex flex-col overflow-y-scroll h-screen'>
            {messages ? messageMapper(messages) : null}
        </div>
    );
}
