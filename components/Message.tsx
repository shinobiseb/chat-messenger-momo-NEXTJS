import React from 'react';
import { MessageReq } from '@/types/types';

export default function Message({ sent, content }: MessageReq) {
    const baseClasses = "p-3 mb-2 text-md max-w-80 sm:max-w-3/4 sm:w-3/4 rounded-md w-full";

    if (sent) {
        return (
            <div id='MessageText' className={`bg-darkgray ${baseClasses} ml-auto`}>
                {content}
            </div>
        );
    } else {
        return (
            <div id='MessageText' className={`bg-lightorange ${baseClasses}`}>
                {content}
            </div>
        );
    }
}